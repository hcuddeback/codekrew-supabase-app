export type EventName =
  | 'order_created'
  | 'order_refunded'
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'subscription_resumed'
  | 'subscription_expired'
  | 'subscription_paused'
  | 'subscription_unpaused'
  | 'subscription_plan_changed'
  | 'subscription_payment_failed'
  | 'subscription_payment_success'
  | 'subscription_payment_recovered'
  | 'subscription_payment_refunded';

export interface LemonsqueezySubscriptionItem {
  id: number;
  price_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  is_usage_based: boolean;
  subscription_id: number;
}

export interface LemonsqueezySubscriptionAttributes {
  urls: {
    customer_portal: string;
    update_payment_method: string;
    customer_portal_update_subscription: string;
  };
  pause: {
    mode: 'void' | 'free';
    resumes_at: string;
  } | null;
  status:
    | 'on_trial'
    | 'active'
    | 'paused'
    | 'past_due'
    | 'unpaid'
    | 'cancelled'
    | 'expired';
  ends_at: string | null;
  order_id: number;
  store_id: number;
  cancelled: boolean;
  renews_at: string;
  test_mode: boolean;
  user_name: string;
  card_brand: string;
  created_at: string;
  product_id: number;
  updated_at: string;
  user_email: string;
  variant_id: number;
  customer_id: number;
  product_name: string;
  variant_name: string;
  order_item_id: number;
  trial_ends_at: string | null;
  billing_anchor: number;
  card_last_four: string;
  status_formatted: string;
  first_subscription_item: LemonsqueezySubscriptionItem;
}

export interface LemonsqueezyWebhookPayload {
  data: {
    id: string;
    type: string;
    attributes: LemonsqueezySubscriptionAttributes;
    relationships: {
      [key: string]: {
        links: {
          self: string;
          related: string;
        };
      };
    };
  };
  meta: {
    test_mode: boolean;
    event_name: EventName;
    webhook_id: string;
  };
}

export interface LemonsqueezyOrder {
  store_id: number;
  customer_id: number;
  identifier: string;
  order_number: number;
  user_name: string;
  user_email: string;
  currency: string;
  currency_rate: string;
  tax_name: string;
  tax_rate: number;
  tax_inclusive: boolean;
  status: 'paid';
  status_formatted: string;
  refunded: boolean;
  refunded_at: string | null;
  subtotal: number;
  discount_total: number;
  tax: number;
  setup_fee: number;
  total: number;
  subtotal_usd: number;
  discount_total_usd: number;
  tax_usd: number;
  setup_fee_usd: number;
  total_usd: number;
  subtotal_formatted: string;
  discount_total_formatted: string;
  tax_formatted: string;
  setup_fee_formatted: string;
  total_formatted: string;
  first_order_item: {
    id: number;
    order_id: number;
    product_id: number;
    variant_id: number;
    price_id: number;
    product_name: string;
    variant_name: string;
    price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
  urls: {
    receipt: string;
  };
  created_at: string;
  updated_at: string;
  test_mode: boolean;
}

export interface Payload {
  meta: {
    test_mode: boolean;
    event_name: EventName;
  };
  data: {
    attributes: LemonsqueezyOrder | LemonsqueezySubscriptionAttributes;
    id: string;
    relationships: unknown;
    type: string;
  };
}
