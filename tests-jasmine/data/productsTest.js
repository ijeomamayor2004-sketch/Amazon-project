import { getProduct, Product, Clothing, Appliance, loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite: products classes', () => {
  it('testing for Product class', () => {
    const testProduct = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    }); 

    // Properties
    expect(testProduct.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(testProduct.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(testProduct.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(testProduct.priceCents).toEqual(1090);
    expect(testProduct.rating).toEqual({
      stars: 4.5,
      count: 87
    });

    // Methods
    expect(testProduct.getPrice()).toEqual('10.90');
    expect(testProduct.extraInfoHTML()).toEqual('');
    expect(testProduct.getStarsUrl()).toContain('rating-45');
  });

  it('testing for Clothing class', () => {
    const testClothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });

    // Properties
    expect(testClothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
    expect(testClothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(testClothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(testClothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(testClothing.priceCents).toEqual(799);
    expect(testClothing.rating).toEqual({
      stars: 4.5,
      count: 56
    });

    // Methods
    expect(testClothing.extraInfoHTML()).toContain('images/clothing-size-chart.png');
    expect(testClothing.getPrice()).toEqual('7.99');
    expect(testClothing.getStarsUrl()).toContain('rating-45');
  });

  it('testing for Appliance class', () => {
    const testAppliance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ]
    });

    // Properties
    expect(testAppliance.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(testAppliance.warrantyLink).toEqual('images/appliance-warranty.png');
    expect(testAppliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(testAppliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(testAppliance.name).toEqual('2 Slot Toaster - Black');
    expect(testAppliance.priceCents).toEqual(1899);
    expect(testAppliance.rating).toEqual({
      stars: 5,
      count: 2197
    });

    // Methods
    expect(testAppliance.extraInfoHTML()).toContain('images/appliance-instructions.png');
    expect(testAppliance.extraInfoHTML()).toContain('images/appliance-instructions.png');
    expect(testAppliance.getPrice()).toEqual('18.99');
    expect(testAppliance.getStarsUrl()).toContain('rating-50');
  });
})

describe('test suite: getProducts', () => {
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  it('with productId existing in product', () => {
    const matchingProduct = getProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(matchingProduct.name).toContain('Black and Gray');
    expect(matchingProduct.priceCents).toEqual(1090);
    expect(matchingProduct.rating.stars).toEqual(4.5);
  });

  it('with productId not existing in product', () => {
    const matchingProduct = getProduct('1');

    expect(matchingProduct).toBeUndefined();
  })
})