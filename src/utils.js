class Complex {
    constructor(a, b) {
      this.re = a;
      this.im = b;
    }
      add(c) {
      const re = this.re += c.re;
      const im = this.im += c.im;
      return new Complex(re, im);
    }
  
    mult(c) {
      const re = this.re * c.re - this.im * c.im;
      const im = this.re * c.im + this.im * c.re;
      return new Complex(re, im);
    }
  }

  
// Discrete Fourier Transform: x is the wave
function dft(x) { 
    const X = [];
    const N = x.length;
    for (k = 0; k < N; k++) {
      let sum = new Complex(0, 0);
      for (n = 0; n < N; n++) {
        const phi = (2 * PI * k * n) / N;
        const c = new Complex(cos(phi), -sin(phi));
        sum = sum.add(x[n].mult(c));
      }

      sum.re = sum.re / N; 
      sum.im = sum.im / N;
  
      let freq = k;
      let amp = sqrt(sum.re * sum.re + sum.im * sum.im);
      let phase = atan2(sum.im, sum.re);
      X[k] = { re: sum.re, im: sum.im, freq, amp, phase }; // Components of a wave
    }
    return X;
  }

// Draw Epicycles
function epiCycles(x, y, rotation, fourier) {
    for (i = 0; i < fourier.length; i++) {
      let prevx = x;
      let prevy = y;
      let freq = fourier[i].freq;
      let radius = fourier[i].amp;
      let phase = fourier[i].phase;
      x += radius * cos(freq * time + phase + rotation);
      y += radius * sin(freq * time + phase + rotation);
  
      stroke(255);
      noFill();
      ellipse(prevx, prevy, radius * 2);
      line(prevx, prevy, x, y);
    }
    return createVector(x, y);
  }