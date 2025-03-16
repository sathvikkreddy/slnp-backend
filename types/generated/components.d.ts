import type { Schema, Struct } from '@strapi/strapi';

export interface AddressFullAddress extends Struct.ComponentSchema {
  collectionName: 'components_address_full_addresses';
  info: {
    description: '';
    displayName: 'Full Address';
  };
  attributes: {
    address_line_1: Schema.Attribute.String & Schema.Attribute.Required;
    address_line_2: Schema.Attribute.String;
    address_line_3: Schema.Attribute.String;
    state: Schema.Attribute.String;
    state_code: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface InvoiceInvoiceItem extends Struct.ComponentSchema {
  collectionName: 'components_invoice_invoice_items';
  info: {
    description: '';
    displayName: 'Invoice Item';
  };
  attributes: {
    amount: Schema.Attribute.Decimal & Schema.Attribute.Required;
    description_line_1: Schema.Attribute.String;
    description_line_2: Schema.Attribute.String;
    description_line_3: Schema.Attribute.String;
    hsn_code: Schema.Attribute.String & Schema.Attribute.Required;
    quantity: Schema.Attribute.Decimal & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    unit: Schema.Attribute.String & Schema.Attribute.Required;
    unit_price: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'address.full-address': AddressFullAddress;
      'invoice.invoice-item': InvoiceInvoiceItem;
    }
  }
}
