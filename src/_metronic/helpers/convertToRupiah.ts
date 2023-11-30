export const convertToRupiah = (number:number) => {
    let numberrev;
    let rupiah = '';
    if (
      number === null ||
      number === undefined ||
      typeof number === 'undefined' ||
      typeof number === 'string'
    ) {
      numberrev = 0;
    } else {
      numberrev = number.toString().split('').reverse().join('');
      for (let i = 0; i < numberrev.length; i++)
        if (i % 3 == 0) rupiah += numberrev.substr(i, 3) + '.';
      return (
        'Rp. ' +
        rupiah
          .split('', rupiah.length - 1)
          .reverse()
          .join('')
      );
    }
};
  