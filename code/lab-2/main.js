// function converts rgb hex to hsl, needed for creative color manipulation of the puppy
const hexToHsl = (hex) => {
  const r = parseInt(`0x${hex.slice(1,2)}`) / 15;
  const g = parseInt(`0x${hex.slice(3,4)}`) / 15;
  const b = parseInt(`0x${hex.slice(5,6)}`) / 15;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;
  if (max == min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    const c = max + min;
    if (c / 2 > 0.5) {
      s = d / (2 - c);
    } else {
      s = d / c;
    }
    switch (max) {
      case r:
        h = (g - b) / d;
        if (g < b) {
          h += 6;
        }
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
      case b:
        h = (r - g) / d + 4;
    }
  }

  h = Math.round(h * 60);
  s = Math.round(s * 100);
  const l = Math.round(100 * ((max + min) / 2));

  return { hue: h, sat: s, lum: l };
};

// function converts hsl to rgb hex, doing the inverse of the function above.
// my first hex to hsl funtion was just based on my notes from prev classes, but
// this hsl to hex function I didn't have as much time to come up with something
// of my own, so I just adapted it from https://stackoverflow.com/a/44134328
const hslToHex = (hsl) => {
  const h = hsl.hue;
  const s = hsl.sat;
  const l = hsl.lum / 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// function shows the puppy svg with some values (like color, and existence of hat) customized to the form
const showPuppy = () => {
  const puppy = document.querySelector('svg');
  const coatColor = document.querySelector('#coat').value;

  // show the puppy
  puppy.style.display = 'block';

  // set all of the puppy's colors
  puppy.querySelectorAll('.fil2').forEach((svgElement) => {
    svgElement.style.fill = coatColor;
  });
  let coatColorHsl = hexToHsl(coatColor);
  if (coatColorHsl.lum < 15) {
    puppy.querySelector('#path946').style.fill = '#FAFAFA';
  } else {
    puppy.querySelector('#path946').style.fill = '#030303';
  }
  coatColorHsl.lum *= 0.8;
  puppy.querySelectorAll('.fil5').forEach((svgElement) => {
    svgElement.style.fill = hslToHex(coatColorHsl);
  });
  coatColorHsl.lum *= 0.8;
  puppy.querySelectorAll('.fil4').forEach((svgElement) => {
    svgElement.style.fill = hslToHex(coatColorHsl);
  });
  coatColorHsl.lum *= 0.8;
  puppy.querySelectorAll('.fil12').forEach((svgElement) => {
    svgElement.style.fill = hslToHex(coatColorHsl);
  });
  coatColorHsl = hexToHsl(coatColor);
  coatColorHsl.lum += (100 - coatColorHsl.lum) / 2;
  coatColorHsl.sat *= 0.6;
  puppy.querySelectorAll('.fil3').forEach((svgElement) => {
    svgElement.style.fill = hslToHex(coatColorHsl);
  });

  // show the right hat (or none at all) on the puppy
  if (document.querySelector('#ballcap').checked == true) {
    puppy.querySelector('#ballcap_layer').style.display = 'block';
    puppy.querySelector('#tophat_layer').style.display = 'none';
  } else if (document.querySelector('#tophat').checked == true) {
    puppy.querySelector('#ballcap_layer').style.display = 'none';
    puppy.querySelector('#tophat_layer').style.display = 'block';
  } else {
    puppy.querySelector('#ballcap_layer').style.display = 'none';
    puppy.querySelector('#tophat_layer').style.display = 'none';
  }
};

// function changes instances of 'your dog' and 'my dog' in the page to the name of the puppy
const changePuppyName = () => {
  let puppyName = document.querySelector('#name').value;
  let puppyAltName = puppyName;
  if (puppyName == '') {
    puppyName = 'your dog';
    puppyAltName = 'my dog';
  }
  document.querySelector('#coatLabel').textContent = `What color is ${puppyName}'s coat?`;
  document.querySelector('#hatLabel').textContent = `Does ${puppyName} like to wear a hat?`;
  document.querySelector('#tophatLabel').textContent = `A classy tophat for ${puppyAltName}!`;
  document.querySelector('#nohatLabel').textContent = `No, ${puppyAltName} doesn't really like hats.`;
}

const enter = document.querySelector('#enter');
enter.addEventListener('click', showPuppy);

const puppyName = document.querySelector('#name');
puppyName.addEventListener('focusout', changePuppyName);
