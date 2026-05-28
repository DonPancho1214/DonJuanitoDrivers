import sharp from 'sharp';

async function generateOGImage() {
  try {
    const resizedLogo = await sharp('public/nuevo-logo.webp')
      .resize({ width: 500, height: 500, fit: 'inside' })
      .toBuffer();

    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 10, g: 10, b: 0, alpha: 1 } // #0a0a00
      }
    })
    .composite([{ input: resizedLogo, gravity: 'center' }])
    .webp({ quality: 90 })
    .toFile('public/og-image.webp');
    console.log('og-image.webp generated successfully!');
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generateOGImage();
