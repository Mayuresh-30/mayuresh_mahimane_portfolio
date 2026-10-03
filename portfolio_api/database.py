from __future__ import annotations

import os
from collections.abc import Generator
from functools import lru_cache

from dotenv import load_dotenv
from fastapi import HTTPException
from sqlalchemy import Engine, create_engine, select, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()


@lru_cache(maxsize=1)
def get_engine() -> Engine | None:
    url = os.getenv("DATABASE_URL", DATABASE_URL).strip()
    if not url:
        return None
    connect_args = {"connect_timeout": 3} if url.startswith("mysql+") else {}
    return create_engine(url, pool_pre_ping=True, pool_recycle=1800, connect_args=connect_args)


@lru_cache(maxsize=1)
def get_session_factory() -> sessionmaker[Session] | None:
    engine = get_engine()
    if engine is None:
        return None
    return sessionmaker(bind=engine, expire_on_commit=False)


def get_db() -> Generator[Session, None, None]:
    factory = get_session_factory()
    if factory is None:
        raise HTTPException(status_code=503, detail="MySQL is not configured. Public preview data is read-only.")
    with factory() as session:
        yield session


def database_status() -> tuple[bool, bool]:
    """Return (connected, content_seeded); no credentials or DSN details are exposed."""
    factory = get_session_factory()
    if factory is None:
        return False, False
    connected = False
    try:
        from .models import Profile, Project, Skill

        with factory() as session:
            session.execute(text("SELECT 1"))
            connected = True
            profile_exists = session.get(Profile, 1) is not None
            skill_exists = session.scalar(select(Skill.id).where(Skill.is_visible.is_(True)).limit(1)) is not None
            project_exists = session.scalar(select(Project.id).where(Project.published.is_(True)).limit(1)) is not None
        return connected, profile_exists and skill_exists and project_exists
    except SQLAlchemyError:
        return connected, False


def database_is_healthy() -> bool:
    return database_status()[0]


def database_is_ready() -> bool:
    return database_status()[1]
