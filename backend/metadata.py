import datetime
import os
from pathlib import Path
from typing import List

from PIL import Image


EXIF_DATETIME_TAG = 36867


def _get_img_datetime(img_path: Path) -> datetime.datetime:
    img = Image.open(img_path)
    exif_data = img._getexif()  # type: ignore
    dt_str = exif_data[EXIF_DATETIME_TAG]
    return datetime.datetime.strptime(dt_str, "%Y:%m:%d %H:%M:%S")


def _rename_filename(*, img_path: Path, dt: datetime.datetime) -> None:
    dt_str = dt.strftime("%y%m%d_%H%M%S")
    new_name = f"{dt_str}_{img_path.name}"
    new_path = img_path.parent / new_name
    os.rename(img_path, new_path)


def rename_images(paths: List[str]) -> None:
    for path_str in paths:
        img_path = Path(path_str)
        img_dt = _get_img_datetime(img_path)
        _rename_filename(img_path=img_path, dt=img_dt)
