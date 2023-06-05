from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import qrcode
from qrcode.constants import ERROR_CORRECT_L

app = FastAPI()

# CORS configuration
origins = [
    "https://ngmisl.github.io/ngqri/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate_qr")
async def generate_qr(request: Request, size: int = 400):
    data = await request.json()
    url = data.get("url")

    qr = qrcode.QRCode(
        version=1,
        error_correction=ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    qr.add_data(url)
    qr.make()

    img = qr.make_image(fill_color="black", back_color="white").resize((size, size))

    stream = BytesIO()
    img.save(stream, format="png")
    stream.seek(0)

    return StreamingResponse(stream, media_type="image/png")
