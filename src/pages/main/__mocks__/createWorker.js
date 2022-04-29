module.exports.createWorker = () => {
  return {
    onerror: jest.fn(),
    onmessage: jest.fn(),
    onmessageerror: jest.fn(),
    terminate: jest.fn(),
    postMessage: function () {
      this.onmessage({ data: null });
    },
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    removeEventListener: jest.fn(),
  };
};
