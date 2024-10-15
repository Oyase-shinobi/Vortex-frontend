class PriceHelper {
  static getPrice = async () => {
    const res = await fetch(
      'https://min-api.cryptocompare.com/data/price?fsym=APT&tsyms=USD',
    ).then((res) => res.json());
    const { USD } = res;
    return USD;
  };
}

export default PriceHelper;
