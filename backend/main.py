from typing import List

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from metadata import rename_images


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Base(BaseModel):
    paths: List[str]
    year_option: str


@app.post("/images")
async def images(payload: Base):
    rename_images(paths=payload.paths, year_option=payload.year_option)
    return {"msg": "Successful"}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
