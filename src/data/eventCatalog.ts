// AUTO-DERIVED from the client's Event_Master table (websiteid 9 = Web, websiteid 4 = App).
// Web and App are intentionally NOT merged: each platform ships its own event codes,
// names and payload fields. A shared `canonicalId` is the only thing that links them.

export type Platform = "web" | "app";
export type EventScope = "standard" | "brand";

export interface CatalogProperty {
  id: string;
  name: string;
  type: "string" | "number";
}

export interface CatalogEvent {
  /** unique key: <platform>_<eventcode> */
  id: string;
  /** raw eventcode as stored in Event_Master */
  code: string;
  /** raw eventname as stored in Event_Master */
  name: string;
  platform: Platform;
  /** standard = mapped to the platform-wide taxonomy, brand = client-specific event */
  scope: EventScope;
  /** taxonomy id shared across web + app when the event has been mapped */
  canonicalId: string | null;
  canonicalName: string | null;
  group: string;
  properties: CatalogProperty[];
}

export const catalogEvents: CatalogEvent[] = [
  {
    "id": "app_add_to_cart",
    "code": "add_to_cart",
    "name": "Add To Cart",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "add_to_cart",
    "canonicalName": "Add to Cart",
    "group": "Conversion",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "category_name",
        "name": "Category Name",
        "type": "string"
      },
      {
        "id": "category_id",
        "name": "Category ID",
        "type": "string"
      },
      {
        "id": "product_price",
        "name": "Product Price",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserID",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_dinein",
    "code": "dinein",
    "name": "DineIn",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "email",
        "name": "Email",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_initialize",
    "code": "initialize",
    "name": "Initialize",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "session_started",
    "canonicalName": "Session Started",
    "group": "Session",
    "properties": [
      {
        "id": "os",
        "name": "OS",
        "type": "string"
      },
      {
        "id": "device_model",
        "name": "Device Model",
        "type": "string"
      },
      {
        "id": "carrier_name",
        "name": "Carrier Name",
        "type": "string"
      },
      {
        "id": "manufacturer",
        "name": "Manufacturer",
        "type": "string"
      },
      {
        "id": "app_version",
        "name": "App Version",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_category",
    "code": "category",
    "name": "Category",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "category_name",
        "name": "Category Name",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_filter_veg",
    "code": "filter_veg",
    "name": "Filter Veg",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "category",
        "name": "Category",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_filter_non_veg",
    "code": "filter_non_veg",
    "name": "Filter Non Veg",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "category",
        "name": "Category",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_checkout",
    "code": "checkout",
    "name": "Checkout",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "checkout_started",
    "canonicalName": "Checkout Started",
    "group": "Conversion",
    "properties": [
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "total_payable",
        "name": "Total Payable",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_first_purchase",
    "code": "first_purchase",
    "name": "First Purchase",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "first_purchase",
    "canonicalName": "First Purchase",
    "group": "Conversion",
    "properties": [
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "crowns_earned",
        "name": "Crowns Earned",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_product_click",
    "code": "product_click",
    "name": "Product Click",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "product_viewed",
    "canonicalName": "Product Viewed",
    "group": "Discovery",
    "properties": [
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "price",
        "name": "Price",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_new_purchase",
    "code": "new_purchase",
    "name": "New Purchase",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "purchase",
    "canonicalName": "Purchase",
    "group": "Conversion",
    "properties": [
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_add_address",
    "code": "add_address",
    "name": "Add Address",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "address_added",
    "canonicalName": "Address Added",
    "group": "Account",
    "properties": [
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserId",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "state",
        "name": "State",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_category_plp",
    "code": "category_plp",
    "name": "Category Plp",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "category_discount",
        "name": "Category Discount",
        "type": "string"
      },
      {
        "id": "category_name",
        "name": "Category Name",
        "type": "string"
      },
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_filter_non_veg",
    "code": "filter_non_veg",
    "name": "Filter Non Veg",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "category",
        "name": "Category",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_filter_veg",
    "code": "filter_veg",
    "name": "Filter Veg",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "category",
        "name": "Category",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_coupon_apply",
    "code": "coupon_apply",
    "name": "Coupon Apply",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "coupon_applied",
    "canonicalName": "Coupon Applied",
    "group": "Conversion",
    "properties": [
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      },
      {
        "id": "issuccessfull",
        "name": "isSuccessfull",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_crown_history",
    "code": "crown_history",
    "name": "Crown History",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Loyalty",
    "properties": [
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_initialize",
    "code": "initialize",
    "name": "Initialize",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "session_started",
    "canonicalName": "Session Started",
    "group": "Session",
    "properties": [
      {
        "id": "os",
        "name": "OS",
        "type": "string"
      },
      {
        "id": "device_model",
        "name": "Device Model",
        "type": "string"
      },
      {
        "id": "carrier_name",
        "name": "Carrier Name",
        "type": "string"
      },
      {
        "id": "manufacturer",
        "name": "Manufacturer",
        "type": "string"
      },
      {
        "id": "app_version",
        "name": "App Version",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_add_to_cart",
    "code": "add_to_cart",
    "name": "Add To Cart",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "add_to_cart",
    "canonicalName": "Add to Cart",
    "group": "Conversion",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "category_name",
        "name": "Category Name",
        "type": "string"
      },
      {
        "id": "category_id",
        "name": "Category ID",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserID",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_new_purchase",
    "code": "new_purchase",
    "name": "New Purchase",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "purchase",
    "canonicalName": "Purchase",
    "group": "Conversion",
    "properties": [
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_checkout",
    "code": "checkout",
    "name": "Checkout",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "checkout_started",
    "canonicalName": "Checkout Started",
    "group": "Conversion",
    "properties": [
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "total_payable",
        "name": "Total Payable",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_first_purchase",
    "code": "first_purchase",
    "name": "First Purchase",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "first_purchase",
    "canonicalName": "First Purchase",
    "group": "Conversion",
    "properties": [
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "crowns_earned",
        "name": "Crowns Earned",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_product_click",
    "code": "product_click",
    "name": "Product Click",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "product_viewed",
    "canonicalName": "Product Viewed",
    "group": "Discovery",
    "properties": [
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "price",
        "name": "Price",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_add_address",
    "code": "add_address",
    "name": "Add Address",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "address_added",
    "canonicalName": "Address Added",
    "group": "Account",
    "properties": [
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserId",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "state",
        "name": "State",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_category_plp",
    "code": "category_plp",
    "name": "Category Plp",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "store_id",
        "name": "Store ID",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "category_discount",
        "name": "Category Discount",
        "type": "string"
      },
      {
        "id": "category_name",
        "name": "Category Name",
        "type": "string"
      },
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_coupon_apply",
    "code": "Coupon_apply",
    "name": "Coupon Apply",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "coupon_applied",
    "canonicalName": "Coupon Applied",
    "group": "Conversion",
    "properties": [
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount_amount",
        "name": "Discount Amount",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      },
      {
        "id": "issuccessfull",
        "name": "isSuccessfull",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_crown_history",
    "code": "crown_history",
    "name": "Crown History",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Loyalty",
    "properties": [
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "region",
        "name": "Region",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_app_launch",
    "code": "app_launch",
    "name": "App Launch",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "session_started",
    "canonicalName": "Session Started",
    "group": "Session",
    "properties": [
      {
        "id": "device_name",
        "name": "Device Name",
        "type": "string"
      },
      {
        "id": "platform",
        "name": "Platform",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_call_restaurant",
    "code": "call_restaurant",
    "name": "Call Restaurant",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "order_id",
        "name": "Order Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_call_rider",
    "code": "call_rider",
    "name": "Call Rider",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "order_id",
        "name": "Order Id",
        "type": "string"
      },
      {
        "id": "rider_name",
        "name": "Rider Name",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_cart_sides",
    "code": "cart_sides",
    "name": "Cart Sides",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "product_id",
        "name": "Product Id",
        "type": "string"
      },
      {
        "id": "category",
        "name": "Category",
        "type": "string"
      },
      {
        "id": "price",
        "name": "Price",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserId",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_category_homepage",
    "code": "category_homepage",
    "name": "Category Homepage",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "category_name",
        "name": "Category Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_coupon_remove",
    "code": "coupon_remove",
    "name": "Coupon Remove",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "coupon_removed",
    "canonicalName": "Coupon Removed",
    "group": "Conversion",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount",
        "name": "Discount",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_crown_redeem",
    "code": "crown_redeem",
    "name": "Crown Redeem",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Loyalty",
    "properties": [
      {
        "id": "crown_redeem",
        "name": "Crown Redeem",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_delivery_mode",
    "code": "delivery_mode",
    "name": "Delivery Mode",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_delivery_service",
    "code": "delivery_service",
    "name": "Delivery Service",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "isservicable",
        "name": "IsServicable",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_dinein_mode",
    "code": "dinein_mode",
    "name": "DineIn Mode",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_edit_profile",
    "code": "edit_profile",
    "name": "Edit Profile",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "profile_updated",
    "canonicalName": "Profile Updated",
    "group": "Account",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "email",
        "name": "Email",
        "type": "string"
      },
      {
        "id": "name",
        "name": "Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_faqs",
    "code": "faqs",
    "name": "Faqs",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Support",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_get_otp",
    "code": "get_otp",
    "name": "Get OTP",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "otp_requested",
    "canonicalName": "OTP Requested",
    "group": "Account",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_hamburger_menu",
    "code": "hamburger_menu",
    "name": "Hamburger Menu",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "device_name",
        "name": "Device Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_home_homepage",
    "code": "home_homepage",
    "name": "Home Homepage",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "user_name",
        "name": "User Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_homescreen_banner",
    "code": "homescreen_banner",
    "name": "Homescreen Banner",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Engagement",
    "properties": [
      {
        "id": "banner_id",
        "name": "Banner Id",
        "type": "string"
      },
      {
        "id": "banner_name",
        "name": "Banner Name",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_kingdeals_banner",
    "code": "kingdeals_banner",
    "name": "Kingdeals Banner",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Engagement",
    "properties": [
      {
        "id": "banner_id",
        "name": "Banner Id",
        "type": "string"
      },
      {
        "id": "banner_name",
        "name": "Banner Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_kingdeals_homepage",
    "code": "kingdeals_homepage",
    "name": "Kingdeals Homepage",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_last_order",
    "code": "last_order",
    "name": "Last Order",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "order_value",
        "name": "Order Value",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_location",
    "code": "location",
    "name": "Location",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "location_shared",
    "canonicalName": "Location Shared",
    "group": "Session",
    "properties": [
      {
        "id": "latitude",
        "name": "Latitude",
        "type": "string"
      },
      {
        "id": "longitude",
        "name": "Longitude",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_login_attempt",
    "code": "login_attempt",
    "name": "Login Attempt",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "login_attempt",
    "canonicalName": "Login Attempt",
    "group": "Account",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_login_failed",
    "code": "login_failed",
    "name": "Login Failed",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "login_failed",
    "canonicalName": "Login Failed",
    "group": "Account",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_login_successful",
    "code": "login_successful",
    "name": "Login Successful",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "login",
    "canonicalName": "Login",
    "group": "Account",
    "properties": [
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "email",
        "name": "Email",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_logout",
    "code": "logout",
    "name": "Logout",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "logout",
    "canonicalName": "Logout",
    "group": "Account",
    "properties": [
      {
        "id": "username",
        "name": "UserName",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_make_payment",
    "code": "make_payment",
    "name": "Make Payment",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "payment_initiated",
    "canonicalName": "Payment Initiated",
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "payment_mode",
        "name": "Payment Mode",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_menu_homepage",
    "code": "menu_homepage",
    "name": "Menu Homepage",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserId",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_nearbystore_homepage",
    "code": "nearbystore_homepage",
    "name": "Nearbystore Homepage",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_product_search",
    "code": "product_search",
    "name": "Product Search",
    "platform": "app",
    "scope": "standard",
    "canonicalId": "search",
    "canonicalName": "Search",
    "group": "Discovery",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "keywords",
        "name": "Keywords",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_purchase_cancelled",
    "code": "purchase_cancelled",
    "name": "Purchase Cancelled",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_rate_order",
    "code": "rate_order",
    "name": "Rate Order",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "order_id",
        "name": "Order Id",
        "type": "string"
      },
      {
        "id": "overall_rating",
        "name": "Overall Rating",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_recent_orders",
    "code": "recent_orders",
    "name": "Recent Orders",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_redeem_attempt",
    "code": "redeem_attempt",
    "name": "Redeem Attempt",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_redeem_failed",
    "code": "redeem_failed",
    "name": "Redeem Failed",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_redeem_succesful",
    "code": "redeem_succesful",
    "name": "Redeem Succesful",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_resend_otp",
    "code": "resend_otp",
    "name": "Resend OTP",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_saved_address",
    "code": "saved_address",
    "name": "Saved Address",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_saved_kingdeals",
    "code": "saved_kingdeals",
    "name": "Saved Kingdeals",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "city",
        "name": "City",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_sel_del_loc",
    "code": "sel_del_loc",
    "name": "Sel Del Loc",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_sel_dine_store",
    "code": "sel_dine_store",
    "name": "Sel Dine Store",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_set_delivery_address",
    "code": "set_delivery_address",
    "name": "Set Delivery Address",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "address",
        "name": "Address",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_shake_game",
    "code": "shake_game",
    "name": "Shake Game",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown points",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_store_search",
    "code": "store_search",
    "name": "Store Search",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "search_text",
        "name": "Search Text",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_takeaway_mode",
    "code": "takeaway_mode",
    "name": "Takeaway Mode",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_terms_conditions",
    "code": "terms_conditions",
    "name": "Terms Conditions",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_update_user",
    "code": "update_user",
    "name": "Update User",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "email",
        "name": "Email",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_verify_otp",
    "code": "verify_otp",
    "name": "Verify OTP",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_view_offers",
    "code": "view_offers",
    "name": "View Offers",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "app_view_order",
    "code": "view_order",
    "name": "View order",
    "platform": "app",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "order_total",
        "name": "Order Total",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_app_launch",
    "code": "app_launch",
    "name": "App Launch",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "session_started",
    "canonicalName": "Session Started",
    "group": "Session",
    "properties": [
      {
        "id": "device_name",
        "name": "Device Name",
        "type": "string"
      },
      {
        "id": "platform",
        "name": "Platform",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_call_restaurant",
    "code": "call_restaurant",
    "name": "Call Restaurant",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "order_id",
        "name": "Order Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_call_rider",
    "code": "call_rider",
    "name": "Call Rider",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "order_id",
        "name": "Order Id",
        "type": "string"
      },
      {
        "id": "rider_name",
        "name": "Rider Name",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_cart_sides",
    "code": "cart_sides",
    "name": "Cart Sides",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "product_id",
        "name": "Product Id",
        "type": "string"
      },
      {
        "id": "category",
        "name": "Category",
        "type": "string"
      },
      {
        "id": "price",
        "name": "Price",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserId",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_category_homepage",
    "code": "category_homepage",
    "name": "Category Homepage",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "category_name",
        "name": "Category Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_coupon_remove",
    "code": "coupon_remove",
    "name": "Coupon Remove",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "coupon_removed",
    "canonicalName": "Coupon Removed",
    "group": "Conversion",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      },
      {
        "id": "discount",
        "name": "Discount",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_crown_redeem",
    "code": "crown_redeem",
    "name": "Crown Redeem",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Loyalty",
    "properties": [
      {
        "id": "crown_redeem",
        "name": "Crown Redeem",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_delivery_mode",
    "code": "delivery_mode",
    "name": "Delivery Mode",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_delivery_service",
    "code": "delivery_service",
    "name": "Delivery Service",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "isservicable",
        "name": "IsServicable",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_dinein_mode",
    "code": "dinein_mode",
    "name": "DineIn Mode",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_edit_profile",
    "code": "edit_profile",
    "name": "Edit Profile",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "profile_updated",
    "canonicalName": "Profile Updated",
    "group": "Account",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "email",
        "name": "Email",
        "type": "string"
      },
      {
        "id": "name",
        "name": "Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_faqs",
    "code": "faqs",
    "name": "Faqs",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Support",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      },
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_get_otp",
    "code": "get_otp",
    "name": "Get OTP",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "otp_requested",
    "canonicalName": "OTP Requested",
    "group": "Account",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_hamburger_menu",
    "code": "hamburger_menu",
    "name": "Hamburger Menu",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "device_name",
        "name": "Device Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_home_homepage",
    "code": "home_homepage",
    "name": "Home Homepage",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      },
      {
        "id": "user_name",
        "name": "User Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_homescreen_banner",
    "code": "homescreen_banner",
    "name": "Homescreen Banner",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Engagement",
    "properties": [
      {
        "id": "banner_id",
        "name": "Banner Id",
        "type": "string"
      },
      {
        "id": "banner_name",
        "name": "Banner Name",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_kingdeals_banner",
    "code": "kingdeals_banner",
    "name": "Kingdeals Banner",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Engagement",
    "properties": [
      {
        "id": "banner_id",
        "name": "Banner Id",
        "type": "string"
      },
      {
        "id": "banner_name",
        "name": "Banner Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_kingdeals_homepage",
    "code": "kingdeals_homepage",
    "name": "Kingdeals Homepage",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "user_id",
        "name": "User Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_last_order",
    "code": "last_order",
    "name": "Last Order",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "order_value",
        "name": "Order Value",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_location",
    "code": "location",
    "name": "Location",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "location_shared",
    "canonicalName": "Location Shared",
    "group": "Session",
    "properties": [
      {
        "id": "latitude",
        "name": "Latitude",
        "type": "string"
      },
      {
        "id": "longitude",
        "name": "Longitude",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_login_attempt",
    "code": "login_attempt",
    "name": "Login Attempt",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "login_attempt",
    "canonicalName": "Login Attempt",
    "group": "Account",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_login_failed",
    "code": "login_failed",
    "name": "Login Failed",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "login_failed",
    "canonicalName": "Login Failed",
    "group": "Account",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_login_successful",
    "code": "login_successful",
    "name": "Login Successful",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "login",
    "canonicalName": "Login",
    "group": "Account",
    "properties": [
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "email",
        "name": "Email",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_logout",
    "code": "logout",
    "name": "Logout",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "logout",
    "canonicalName": "Logout",
    "group": "Account",
    "properties": [
      {
        "id": "username",
        "name": "UserName",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_make_payment",
    "code": "make_payment",
    "name": "Make Payment",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "payment_initiated",
    "canonicalName": "Payment Initiated",
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "cart_value",
        "name": "Cart Value",
        "type": "string"
      },
      {
        "id": "payment_mode",
        "name": "Payment Mode",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_menu_homepage",
    "code": "menu_homepage",
    "name": "Menu Homepage",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "crown_points",
        "name": "Crown Points",
        "type": "string"
      },
      {
        "id": "userid",
        "name": "UserId",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_nearbystore_homepage",
    "code": "nearbystore_homepage",
    "name": "Nearbystore Homepage",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_product_search",
    "code": "product_search",
    "name": "Product Search",
    "platform": "web",
    "scope": "standard",
    "canonicalId": "search",
    "canonicalName": "Search",
    "group": "Discovery",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "keywords",
        "name": "Keywords",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_purchase_cancelled",
    "code": "purchase_cancelled",
    "name": "Purchase Cancelled",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "coupon_name",
        "name": "Coupon Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_rate_order",
    "code": "rate_order",
    "name": "Rate Order",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "order_id",
        "name": "Order Id",
        "type": "string"
      },
      {
        "id": "overall_rating",
        "name": "Overall Rating",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_recent_orders",
    "code": "recent_orders",
    "name": "Recent Orders",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_redeem_attempt",
    "code": "redeem_attempt",
    "name": "Redeem Attempt",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_redeem_failed",
    "code": "redeem_failed",
    "name": "Redeem Failed",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_redeem_succesful",
    "code": "redeem_succesful",
    "name": "Redeem Succesful",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "product_name",
        "name": "Product Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_resend_otp",
    "code": "resend_otp",
    "name": "Resend OTP",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_saved_address",
    "code": "saved_address",
    "name": "Saved Address",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_saved_kingdeals",
    "code": "saved_kingdeals",
    "name": "Saved Kingdeals",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "city",
        "name": "City",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_sel_del_loc",
    "code": "sel_del_loc",
    "name": "Sel Del Loc",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "order_mode",
        "name": "Order Mode",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_sel_dine_store",
    "code": "sel_dine_store",
    "name": "Sel Dine Store",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_set_delivery_address",
    "code": "set_delivery_address",
    "name": "Set Delivery Address",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Brand Journey",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "city",
        "name": "City",
        "type": "string"
      },
      {
        "id": "address",
        "name": "Address",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_shake_game",
    "code": "shake_game",
    "name": "Shake Game",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "crown_points",
        "name": "Crown points",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_store_search",
    "code": "store_search",
    "name": "Store Search",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Discovery",
    "properties": [
      {
        "id": "search_text",
        "name": "Search Text",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_takeaway_mode",
    "code": "takeaway_mode",
    "name": "Takeaway Mode",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "store_name",
        "name": "Store Name",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_terms_conditions",
    "code": "terms_conditions",
    "name": "Terms Conditions",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_update_user",
    "code": "update_user",
    "name": "Update User",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "mobile_no",
        "name": "Mobile No",
        "type": "string"
      },
      {
        "id": "email",
        "name": "Email",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_verify_otp",
    "code": "verify_otp",
    "name": "Verify OTP",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_view_offers",
    "code": "view_offers",
    "name": "View Offers",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Other",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      }
    ]
  },
  {
    "id": "web_view_order",
    "code": "view_order",
    "name": "View order",
    "platform": "web",
    "scope": "brand",
    "canonicalId": null,
    "canonicalName": null,
    "group": "Conversion",
    "properties": [
      {
        "id": "store_id",
        "name": "Store Id",
        "type": "string"
      },
      {
        "id": "order_total",
        "name": "Order Total",
        "type": "string"
      }
    ]
  }
];

export const eventGroups: string[] = ["Account", "Brand Journey", "Conversion", "Discovery", "Engagement", "Loyalty", "Other", "Session", "Support"];

export const eventsFor = (p: Platform) => catalogEvents.filter((e) => e.platform === p);

/** canonicalId -> { web, app } — used to show "also tracked on the other platform" */
export const canonicalPairs = () => {
  const map = new Map<string, { web?: CatalogEvent; app?: CatalogEvent }>();
  catalogEvents.forEach((e) => {
    if (!e.canonicalId) return;
    const entry = map.get(e.canonicalId) ?? {};
    entry[e.platform] = e;
    map.set(e.canonicalId, entry);
  });
  return map;
};

export const counterpartOf = (e: CatalogEvent) =>
  e.canonicalId
    ? catalogEvents.find((o) => o.canonicalId === e.canonicalId && o.platform !== e.platform) ?? null
    : null;

