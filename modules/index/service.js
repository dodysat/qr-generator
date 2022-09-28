const QRCode = require('qrcode')

module.exports = class Service {

  async generate(req, res) {
    const { payload, name, m, w, light, dark, download } = req.query;

    if (!payload) {
      return res.status(400).send('Missing payload');
    }

    const options = {
      margin: m || 1,
      width: w || 500,
      color: {
        dark: dark || '#000000',
        light: light || '#ffffff',
      }
    }

    const generated = await QRCode.toDataURL(payload, options);
    const base64Sanitized = generated.replace(/^data:image\/png;base64,/, '');

    const randomName = name || Math.random().toString(36).substring(2, 12);
    const fileName = name || randomName;

    res.setHeader('Content-Type', 'image/png');
    if (download) {
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}.png"`);
    }
    res.send(Buffer.from(base64Sanitized, 'base64'));


  }

}
