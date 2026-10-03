from __future__ import annotations

import json
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from portfolio_api.database import get_engine
from portfolio_api.models import Profile, Project, Skill

load_dotenv()
SEED_PATH = Path(__file__).resolve().parents[1] / "seed" / "portfolio.json"


def seed() -> None:
    engine = get_engine()
    if engine is None:
        raise RuntimeError("Set DATABASE_URL in .env before seeding MySQL.")
    payload = json.loads(SEED_PATH.read_text(encoding="utf-8"))
    with Session(engine) as session:
        profile_data = payload["profile"]
        profile = session.get(Profile, 1)
        if profile is None:
            profile = Profile(id=1, **profile_data)
            session.add(profile)
        else:
            for key, value in profile_data.items():
                setattr(profile, key, value)

        for item in payload["skills"]:
            skill = session.scalar(select(Skill).where(Skill.name == item["name"]))
            if skill is None:
                skill = Skill(**item, is_visible=True)
                session.add(skill)
            else:
                for key, value in item.items():
                    setattr(skill, key, value)
                skill.is_visible = True

        session.flush()
        for item in payload["projects"]:
            project = session.get(Project, item["id"])
            if project is None:
                project = Project(id=item["id"])
                session.add(project)
            for key in ("name", "subtitle", "description", "status", "github_url", "live_url", "image_path", "featured", "sort_order"):
                setattr(project, key, item[key])
            project.published = True
            linked_skills: list[Skill] = []
            for name in item["technologies"]:
                skill = session.scalar(select(Skill).where(Skill.name == name))
                if skill is None:
                    skill = Skill(name=name, category="Project tags", icon_key=None, sort_order=0, is_visible=False)
                    session.add(skill)
                    session.flush()
                linked_skills.append(skill)
            project.skills = linked_skills
        session.commit()
    print("Portfolio profile, skills, and projects were seeded into MySQL.")


if __name__ == "__main__":
    seed()
