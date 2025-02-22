import type { Schema, Struct } from '@strapi/strapi';

export interface AddressFullAddress extends Struct.ComponentSchema {
  collectionName: 'components_address_full_addresses';
  info: {
    displayName: 'Full Address';
  };
  attributes: {
    addressLine1: Schema.Attribute.String & Schema.Attribute.Required;
    addressLine2: Schema.Attribute.String;
    addressLine3: Schema.Attribute.String;
    state: Schema.Attribute.String;
    stateCode: Schema.Attribute.Integer &
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
    displayName: 'Invoice Item';
  };
  attributes: {
    amount: Schema.Attribute.Decimal & Schema.Attribute.Required;
    description1: Schema.Attribute.String;
    description2: Schema.Attribute.String;
    description3: Schema.Attribute.String;
    hsnCode: Schema.Attribute.String & Schema.Attribute.Required;
    quantity: Schema.Attribute.Decimal & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    unit: Schema.Attribute.String & Schema.Attribute.Required;
    unitPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
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
