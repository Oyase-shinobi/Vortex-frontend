class StringHelper {
  static truncateAddress = (address: string) => {
    if (address === undefined) {
      return;
    }
    const truncateRegex = /^(0x[a-zA-Z0-9]{6})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/;
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  static numberWithComma = (num: number, maximumFractionDigits?: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: maximumFractionDigits ?? 4,
    }); // US format
    return formatter.format(num);
  };
}

export default StringHelper;
