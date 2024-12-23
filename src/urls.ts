export const vendors = {
  getAllVendors: "/vendors",
};

export const orders = {
  getTotalProductsInfoSoldByVendor: (vendorName: string) => `/orders/${vendorName}`,
  getMonthlySellingRatesByVendor: (vendorName: string, year: string) =>
    `/orders/monthly/${vendorName}/${year}`,
};

const URLS = {
  vendors,
  orders,
};

export { URLS };
