// Define a type for the values array
type OptionValues = string[];

// Define a type for a single option
interface Option {
  id: string;
  title: string;
  values: OptionValues;
}

// Define a type for the entire array of options
export type OptionsArray = Option[];

interface OptionValue {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    value: string;
    option_id: string;
    variant_id: string;
    metadata: any | null;
  }
  
  interface Price {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    currency_code: string;
    amount: number;
    min_quantity: number | null;
    max_quantity: number | null;
    price_list_id: string | null;
    region_id: string | null;
    price_list: any | null;
    variant_id: string;
  }
  
  export interface Variant {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    title: string;
    product_id: string;
    sku: string | null;
    barcode: string | null;
    ean: string | null;
    upc: string | null;
    variant_rank: number;
    inventory_quantity: number;
    allow_backorder: boolean;
    manage_inventory: boolean;
    hs_code: string | null;
    origin_country: string | null;
    mid_code: string | null;
    material: string | null;
    weight: number | null;
    length: number | null;
    height: number | null;
    width: number | null;
    metadata: any | null;
    options: OptionValue[];
    prices: Price[];
    original_price: number | null;
    calculated_price: number | null;
    original_price_incl_tax: number | null;
    calculated_price_incl_tax: number | null;
    original_tax: number | null;
    calculated_tax: number | null;
    tax_rates: any | null;
  }

  type DateString = Date; // Assuming the date is represented as a string in ISO format

  interface Address {
    id: string;
    created_at: DateString;
    updated_at: DateString;
    deleted_at: null | DateString;
    customer_id: null | string;
    customer: null | Customer;
    company: null | string;
    first_name: null | string;
    last_name: null | string;
    address_1: null | string;
    address_2: null | string;
    city: null | string;
    country_code: null | string; // Assuming ISO 3166-1 alpha-2 format
    country: null | Country;
    province: null | string;
    postal_code: null | string;
    phone: null | string;
    metadata: Record<string, unknown>;
  }

  interface Order {
    // Define the structure of Order here
  }
  
  interface Swap {
    // Define the structure of Swap here
  }
  
  interface ClaimOrder {
    // Define the structure of ClaimOrder here
  }
  
  interface LineItemTaxLine {
    // Define the structure of LineItemTaxLine here
  }
  
  interface LineItemAdjustment {
    // Define the structure of LineItemAdjustment here
  }

  interface ProductStatus {
    // Define the properties of ProductStatus based on your schema
  }
  
  interface Image {
    // Define the properties of Image based on your schema
  }
  
  interface ProductOption {
    // Define the properties of ProductOption based on your schema
  }
  
  interface ProductVariant {
    // Define the properties of ProductVariant based on your schema
  }
  
  interface ProductCategory {
    // Define the properties of ProductCategory based on your schema
  }
  
  interface ShippingProfile {
    // Define the properties of ShippingProfile based on your schema
  }
  
  interface ProductCollection {
    // Define the properties of ProductCollection based on your schema
  }
  
  interface ProductType {
    // Define the properties of ProductType based on your schema
  }
  
  interface ProductTag {
    // Define the properties of ProductTag based on your schema
  }
  
  interface SalesChannel {
    // Define the properties of SalesChannel based on your schema
  }

  export interface ShippingOption {
    id: string;
    created_at: DateString;
    updated_at: DateString;
    deleted_at: null | DateString;
    name: string;
    region_id: string;
    region: Region;
    profile_id: string;
    profile: ShippingProfile;
    provider_id: string;
    provider: FulfillmentProvider;
    price_type: ShippingOptionPriceType;
    amount: null | number;
    is_return: boolean;
    admin_only: boolean;
    requirements: ShippingOptionRequirement[];
    data: Record<string, unknown>;
    metadata: Record<string, unknown>;
    includes_tax: boolean;
  }
  
  // Example interfaces for related types (you'll need to define these based on your schema)
  interface Region {
    // Define the properties of Region based on your schema
  }
  
  interface ShippingProfile {
    // Define the properties of ShippingProfile based on your schema
  }
  
  interface FulfillmentProvider {
    // Define the properties of FulfillmentProvider based on your schema
  }
  
  interface ShippingOptionPriceType {
    // Define the properties of ShippingOptionPriceType based on your schema
  }
  
  interface ShippingOptionRequirement {
    // Define the properties of ShippingOptionRequirement based on your schema
  }

  interface Product {
    id: string;
    created_at: DateString;
    updated_at: DateString;
    deleted_at: null | DateString;
    title: string;
    subtitle: null | string;
    description: null | string;
    handle: null | string;
    is_giftcard: boolean;
    status: ProductStatus;
    images: Image[];
    thumbnail: null | string;
    options: ProductOption[];
    variants: ProductVariant[];
    categories: ProductCategory[];
    profile_id: string;
    profile: ShippingProfile;
    profiles: ShippingProfile[];
    weight: null | number;
    length: null | number;
    height: null | number;
    width: null | number;
    hs_code: null | string;
    origin_country: null | string;
    mid_code: null | string;
    material: null | string;
    collection_id: null | string;
    collection: ProductCollection;
    type_id: null | string;
    type: ProductType;
    tags: ProductTag[];
    discountable: boolean;
    external_id: null | string;
    metadata: null | Record<string, unknown>;
    sales_channels: SalesChannel[];
  }
  
  interface MoneyAmount {
    // Define the properties of MoneyAmount based on your schema
  }
  
  interface ProductOptionValue {
    // Define the properties of ProductOptionValue based on your schema
  }
  
  interface ProductVariantInventoryItem {
    // Define the properties of ProductVariantInventoryItem based on your schema
  }
  
  interface ProductVariant {
    id: string;
    created_at: DateString;
    updated_at: DateString;
    deleted_at: null | DateString;
    title: string;
    product_id: string;
    product: Product;
    prices: MoneyAmount[];
    sku: null | string;
    barcode: null | string;
    ean: null | string;
    upc: null | string;
    variant_rank: null | number;
    inventory_quantity: number;
    allow_backorder: boolean;
    manage_inventory: boolean;
    hs_code: null | string;
    origin_country: null | string;
    mid_code: null | string;
    material: null | string;
    weight: null | number;
    length: null | number;
    height: null | number;
    width: null | number;
    options: ProductOptionValue[];
    inventory_items: ProductVariantInventoryItem[];
    metadata: null | Record<string, unknown>;
    purchasable: boolean;
  }
  
  
  interface OrderEdit {
    // Define the structure of OrderEdit here
  }

  interface LineItem {
    id: string;
    created_at: DateString;
    updated_at: DateString;
    cart_id: string;
    cart: Cart;
    order_id: null | string;
    order: Order;
    swap_id: string;
    swap: Swap;
    claim_order_id: string;
    claim_order: ClaimOrder;
    tax_lines: LineItemTaxLine[];
    adjustments: LineItemAdjustment[];
    title: string;
    description: null | string;
    thumbnail: null | string;
    is_return: boolean;
    is_giftcard: boolean;
    should_merge: boolean;
    allow_discounts: boolean;
    has_shipping: null | boolean;
    unit_price: number;
    variant_id: null | string;
    variant: ProductVariant;
    product_id: null | string;
    quantity: number;
    fulfilled_quantity: null | number;
    returned_quantity: null | number;
    shipped_quantity: null | number;
    metadata: Record<string, unknown>;
    includes_tax: boolean;
    original_item_id: null | string;
    order_edit_id: null | string;
    order_edit: null | OrderEdit;
    refundable: null | number;
    subtotal: null | number;
    tax_total: null | number;
    total: null | number;
    original_total: null | number;
    original_tax_total: null | number;
    discount_total: null | number;
    raw_discount_total: null | number;
    gift_card_total: null | number;
  }

interface Country {
  // Define the structure of Country here
}

interface Region {
  // Define the structure of Region here
}

interface Discount {
  // Define the structure of Discount here
}

interface GiftCard {
  // Define the structure of GiftCard here
}

interface Customer {
  // Define the structure of Customer here
}

interface PaymentSession {
  id: string;
  created_at: DateString;
  updated_at: DateString;
  cart_id: null | string;
  cart: Cart;
  provider_id: string;
  is_selected: null | boolean;
  is_initiated: boolean;
  status: string;
  data: Record<string, unknown>;
  idempotency_key: string;
  amount: number;
  payment_authorized_at: DateString;
}

interface Payment {
  // Define the structure of Payment here
}

interface ShippingMethod {
  // Define the structure of ShippingMethod here
}

interface SalesChannel {
  // Define the structure of SalesChannel here
}
interface Return {
  // Define the structure of Return here
}


interface ShippingMethodTaxLine {
  // Define the structure of ShippingMethodTaxLine here
}

interface ShippingMethod {
  id: string;
  shipping_option_id: string;
  order_id: string;
  order: Order;
  claim_order_id: null | string;
  claim_order: ClaimOrder;
  cart_id: string;
  cart: Cart;
  swap_id: string;
  swap: Swap;
  return_id: string;
  return_order: Return;
  shipping_option: ShippingOption;
  tax_lines: ShippingMethodTaxLine[];
  price: number;
  data: Record<string, unknown>;
  includes_tax: boolean;
  subtotal: number;
  total: number;
  tax_total: number;
}

type CartType = "default" | string; // Assuming 'default' is a possible value and other string values are allowed

export interface Cart {
  id: string;
  created_at: DateString;
  updated_at: DateString;
  deleted_at: null | DateString;
  object: "cart";
  email: string;
  billing_address_id: string;
  billing_address: Address;
  shipping_address_id: string;
  shipping_address: null | Address;
  items: LineItem[];
  region_id: string;
  region: Region;
  discounts: Discount[];
  gift_cards: GiftCard[];
  customer_id: string;
  customer: Customer;
  payment_session: null | PaymentSession;
  payment_sessions: PaymentSession[];
  payment_id: string;
  payment: Payment;
  shipping_methods: ShippingMethod[];
  type: CartType;
  completed_at: DateString;
  payment_authorized_at: DateString;
  idempotency_key: string;
  context: Record<string, unknown>;
  metadata: Record<string, unknown>;
  sales_channel_id: null | string;
  sales_channel: SalesChannel;
  sales_channels?: SalesChannel[];
  shipping_total: number;
  discount_total: number;
  raw_discount_total: number;
  item_tax_total: null | number;
  shipping_tax_total: null | number;
  tax_total: null | number;
  refunded_total: number;
  total: number;
  subtotal: number;
  refundable_amount: number;
  gift_card_total: number;
  gift_card_tax_total: number;
}