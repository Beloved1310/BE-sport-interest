const { Response } = require('express');

const ResponseService = {
  success: function (res, message, data = null, meta = null) {
    const payload = {
      message: message,
      status: true,
      error: false,
    };

    if (data) payload.data = data;
    if (meta) payload.meta = meta;

    res.status(200).json(payload);
    return {};
  },
};

module.exports = ResponseService;
