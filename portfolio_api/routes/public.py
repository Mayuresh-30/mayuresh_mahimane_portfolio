from __future__ import annotations

import json
import logging
from functools import lru_cache
from pathlib import Path

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import selectinload

from ..database import database_status, get_session_factory
from ..models import Profile, Project, Skill

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["portfolio"])
SEED_PATH = Path(__file__).resolve().parents[2] / "seed" / "portfolio.json"


@lru_cache(maxsize=1)
def _seed() -> dict:
    return json.loads(SEED_PATH.read_text(encoding="utf-8"))


def _profile_from_model(item: Profile) -> dict:
    return {
        "name": item.name,
        "title": item.title,
        "bio": item.bio,
        "image_path": item.image_path,
        "email": item.email,
        "linkedin_url": item.linkedin_url,
        "github_url": item.github_url,
        "experience": item.experience or [],
        "education": item.education or [],
    }


def _project_from_model(item: Project) -> dict:
    return {
        "id": item.id,
        "name": item.name,
        "subtitle": item.subtitle,
        "description": item.description,
        "status": item.status,
        "github_url": item.github_url,
        "live_url": item.live_url,
        "image_path": item.image_path,
        "featured": item.featured,
        "sort_order": item.sort_order,
        "technologies": [skill.name for skill in sorted(item.skills, key=lambda skill: skill.name.lower())],
    }


@router.get("/health")
def health() -> dict:
    connected, ready = database_status()
    return {"status": "ok", "database_connected": connected, "database_ready": ready, "content_source": "mysql" if ready else "seed"}


@router.get("/profile")
def get_profile() -> dict:
    factory = get_session_factory()
    if factory:
        try:
            with factory() as session:
                item = session.get(Profile, 1)
                if item:
                    return _profile_from_model(item)
        except SQLAlchemyError as exc:
            logger.warning("Using portfolio seed because MySQL is unavailable (%s).", type(exc).__name__)
    return _seed()["profile"]


@router.get("/skills")
def get_skills() -> list[dict]:
    factory = get_session_factory()
    if factory:
        try:
            with factory() as session:
                items = session.scalars(select(Skill).where(Skill.is_visible.is_(True)).order_by(Skill.category, Skill.sort_order, Skill.id)).all()
                if items:
                    return [{"id": item.id, "name": item.name, "category": item.category, "icon_key": item.icon_key, "sort_order": item.sort_order} for item in items]
        except SQLAlchemyError as exc:
            logger.warning("Using portfolio skill seed because MySQL is unavailable (%s).", type(exc).__name__)
    return _seed()["skills"]


@router.get("/projects")
def get_projects(status: str | None = Query(default=None)) -> list[dict]:
    if status is not None and status not in {"working", "deployed", "completed"}:
        raise HTTPException(status_code=422, detail="Status must be working, deployed, or completed.")
    factory = get_session_factory()
    if factory:
        try:
            with factory() as session:
                has_projects = session.scalar(select(Project.id).where(Project.published.is_(True)).limit(1)) is not None
                statement = select(Project).where(Project.published.is_(True)).options(selectinload(Project.skills)).order_by(Project.sort_order, Project.id)
                if status:
                    statement = statement.where(Project.status == status)
                items = session.scalars(statement).all()
                if has_projects:
                    return [_project_from_model(item) for item in items]
        except SQLAlchemyError as exc:
            logger.warning("Using portfolio project seed because MySQL is unavailable (%s).", type(exc).__name__)
    projects = sorted(_seed()["projects"], key=lambda item: (item["sort_order"], item["id"]))
    return [item for item in projects if status is None or item["status"] == status]
