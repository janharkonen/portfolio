type BrandedItem = {
  displayName: string;
  logoUrl: string;
};

export const brandedItems = {
  REACT: {
    displayName: "React",
    logoUrl: "/react_dark.svg",
  },
  GOLANG: {
    displayName: "Go",
    logoUrl: "/golang_dark.svg",
  },
  PYTHON: {
    displayName: "Python",
    logoUrl: "/python.svg",
  },
  CONVEX: {
    displayName: "Convex",
    logoUrl: "/convex.svg",
  },
} satisfies Record<string, BrandedItem>;

export type BrandedItemKey = keyof typeof brandedItems;
export default brandedItems;
