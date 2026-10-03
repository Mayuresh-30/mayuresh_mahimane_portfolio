from fastapi import FastAPI

from .routes.public import router as public_router

app = FastAPI(title="Mayuresh Mahimane Portfolio API", version="1.0.0")
app.include_router(public_router)
