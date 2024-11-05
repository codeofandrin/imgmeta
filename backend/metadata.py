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


def _rename_filename(
    *, img_path: Path, dt: datetime.datetime, year_option: str, time_option: bool
) -> None:
    if year_option == "YY":
        year_format = "%y"
    else:
        year_format = "%Y"

    if time_option:
        format_str = f"{year_format}%m%d_%H%M%S"
    else:
        format_str = f"{year_format}%m%d"

    dt_str = dt.strftime(format_str)
    new_name = f"{dt_str}_{img_path.name}"
    new_path = img_path.parent / new_name
    os.rename(img_path, new_path)


def rename_images(*, paths: List[str], year_option: str, time_option: bool) -> None:
    for path_str in paths:
        img_path = Path(path_str)
        img_dt = _get_img_datetime(img_path)
        _rename_filename(
            img_path=img_path,
            dt=img_dt,
            year_option=year_option,
            time_option=time_option,
        )
