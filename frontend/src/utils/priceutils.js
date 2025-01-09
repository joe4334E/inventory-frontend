export const isValidPrice = (price) => {
    const validPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    return !isNaN(validPrice) && validPrice > 0;
  };
  