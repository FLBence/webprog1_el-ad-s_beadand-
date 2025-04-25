self.onmessage = function(e) {
    const num = e.data;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    self.postMessage(result);
  };