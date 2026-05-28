import sharp from 'sharp';

async function generateFavicon() {
  try {
    await sharp('public/nuevo-logo.webp')
      .resize({ width: 64, height: 64, fit: 'inside' })
      .png()
      .toFile('public/nuevo-logo.png');
    console.log('nuevo-logo.png generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();
