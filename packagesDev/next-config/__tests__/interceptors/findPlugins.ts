import type { GraphCommerceConfig } from '../../src/generated/config'
import { findPlugins } from '../../src/interceptors/findPlugins'
const projectRoot = `${process.cwd()}/examples/magento-graphcms`
it('finds plugins', () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
    demoMode: true,
    debug: { pluginStatus: true },
  } as GraphCommerceConfig
  const [plugins, errors] = findPlugins(fakeconfig, projectRoot)
  const disabled = plugins.filter((p) => !p.enabled)
  const enabled = plugins.filter((p) => p.enabled)
  expect(errors).toMatchInlineSnapshot('[]')
  expect(enabled).toMatchInlineSnapshot(`
    [
      {
        "enabled": true,
        "ifConfig": "demoMode",
        "sourceExport": "AddProductsToCartForm",
        "sourceModule": "./plugins/EnableCrosssellsPlugin",
        "targetExport": "AddProductsToCartForm",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "demoMode",
        "sourceExport": "RowLinks",
        "sourceModule": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoRowLinks",
        "targetExport": "RowLinks",
        "targetModule": "@graphcommerce/next-ui",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "demoMode",
        "sourceExport": "RecentlyViewedProducts",
        "sourceModule": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoRecentlyViewedProducts",
        "targetExport": "RecentlyViewedProducts",
        "targetModule": "@graphcommerce/magento-recently-viewed-products",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "demoMode",
        "sourceExport": "ProductListItemConfigurable",
        "sourceModule": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItemConfigurable",
        "targetExport": "ProductListItemConfigurable",
        "targetModule": "@graphcommerce/magento-product-configurable",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "googleAnalyticsId",
        "sourceExport": "sendEvent",
        "sourceModule": "@graphcommerce/googleanalytics/plugins/gtagEvent",
        "targetExport": "sendEvent",
        "targetModule": "@graphcommerce/google-datalayer",
        "type": "function",
      },
      {
        "enabled": true,
        "ifConfig": "googleAnalyticsId",
        "sourceExport": "DocumentHeadEnd",
        "sourceModule": "@graphcommerce/googleanalytics/plugins/GoogleAnalyticsTag",
        "targetExport": "DocumentHeadEnd",
        "targetModule": "@graphcommerce/next-ui/server",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "googleRecaptchaKey",
        "sourceExport": "GraphQLProvider",
        "sourceModule": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaGraphQLProvider",
        "targetExport": "GraphQLProvider",
        "targetModule": "@graphcommerce/graphql",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "googleRecaptchaKey",
        "sourceExport": "ApolloErrorSnackbar",
        "sourceModule": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorSnackbar",
        "targetExport": "ApolloErrorSnackbar",
        "targetModule": "@graphcommerce/ecommerce-ui",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "googleRecaptchaKey",
        "sourceExport": "ApolloErrorFullPage",
        "sourceModule": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorFullPage",
        "targetExport": "ApolloErrorFullPage",
        "targetModule": "@graphcommerce/ecommerce-ui",
        "type": "component",
      },
      {
        "enabled": true,
        "ifConfig": "googleRecaptchaKey",
        "sourceExport": "ApolloErrorAlert",
        "sourceModule": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorAlert",
        "targetExport": "ApolloErrorAlert",
        "targetModule": "@graphcommerce/ecommerce-ui",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "hygraphPageContent",
        "sourceModule": "@graphcommerce/hygraph-dynamic-rows/plugins/hygraphDynamicRowsPageContent",
        "targetExport": "hygraphPageContent",
        "targetModule": "@graphcommerce/hygraph-ui",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "previewModeDefaults",
        "sourceModule": "@graphcommerce/hygraph-ui/plugins/hygraphPreviewModeDefaults",
        "targetExport": "previewModeDefaults",
        "targetModule": "@graphcommerce/ecommerce-ui",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "graphqlConfig",
        "sourceModule": "@graphcommerce/hygraph-ui/plugins/hygraphGraphqlConfig",
        "targetExport": "graphqlConfig",
        "targetModule": "@graphcommerce/graphql",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "PreviewModeToolbar",
        "sourceModule": "@graphcommerce/hygraph-ui/plugins/HygraphPreviewModeToolbar",
        "targetExport": "PreviewModeToolbar",
        "targetModule": "@graphcommerce/ecommerce-ui",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "meshConfig",
        "sourceModule": "@graphcommerce/magento-graphql-rest/plugins/meshConfigM2Rest",
        "targetExport": "meshConfig",
        "targetModule": "@graphcommerce/graphql-mesh/meshConfig",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "PaymentMethodContextProvider",
        "sourceModule": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
        "targetExport": "PaymentMethodContextProvider",
        "targetModule": "@graphcommerce/magento-cart-payment-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "CartItemActionCard",
        "sourceModule": "@graphcommerce/magento-product-bundle/plugins/BundleCartItemActionCard",
        "targetExport": "CartItemActionCard",
        "targetModule": "@graphcommerce/magento-cart-items",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "CartItemActionCard",
        "sourceModule": "@graphcommerce/magento-product-virtual/plugins/VirtualCartItemActionCard",
        "targetExport": "CartItemActionCard",
        "targetModule": "@graphcommerce/magento-cart-items",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "AddProductsToCartForm",
        "sourceModule": "@graphcommerce/magento-wishlist/plugins/WishlistProductAddToCartFormPlugin",
        "targetExport": "AddProductsToCartForm",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "WishlistItemActionCard",
        "sourceModule": "@graphcommerce/magento-wishlist/plugins/ConfigurableWishlistItemActionCard",
        "targetExport": "WishlistItemActionCard",
        "targetModule": "@graphcommerce/magento-wishlist",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "WishlistItemActionCard",
        "sourceModule": "@graphcommerce/magento-wishlist/plugins/BundleWishlistItemActionCard",
        "targetExport": "WishlistItemActionCard",
        "targetModule": "@graphcommerce/magento-wishlist",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "ShippingMethodForm",
        "sourceModule": "@graphcommerce/magento-cart-pickup/plugins/AddPickupInStore",
        "targetExport": "ShippingMethodForm",
        "targetModule": "@graphcommerce/magento-cart-shipping-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "PaymentMethodContextProvider",
        "sourceModule": "@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods",
        "targetExport": "PaymentMethodContextProvider",
        "targetModule": "@graphcommerce/magento-cart-payment-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "PaymentMethodContextProvider",
        "sourceModule": "@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods",
        "targetExport": "PaymentMethodContextProvider",
        "targetModule": "@graphcommerce/magento-cart-payment-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "CartItemActionCard",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableCartItemActionCard",
        "targetExport": "CartItemActionCard",
        "targetModule": "@graphcommerce/magento-cart-items",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "ProductPagePriceTiers",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPagePriceTiers",
        "targetExport": "ProductPagePriceTiers",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "ProductPagePrice",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPagePrice",
        "targetExport": "ProductPagePrice",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "ProductPageGallery",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageGallery",
        "targetExport": "ProductPageGallery",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "CartItemActionCard",
        "sourceModule": "@graphcommerce/magento-product-simple/plugins/SimpleCartItemActionCard",
        "targetExport": "CartItemActionCard",
        "targetModule": "@graphcommerce/magento-cart-items",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "PaymentMethodContextProvider",
        "sourceModule": "@graphcommerce/magento-payment-paypal/plugins/AddPaypalMethods",
        "targetExport": "PaymentMethodContextProvider",
        "targetModule": "@graphcommerce/magento-cart-payment-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "meshConfig",
        "sourceModule": "@graphcommerce/algolia-categories/plugins/meshConfigAlgoliaCategories",
        "targetExport": "meshConfig",
        "targetModule": "@graphcommerce/graphql-mesh/meshConfig",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "getSearchSuggestionsInput",
        "sourceModule": "@graphcommerce/algolia-personalization/plugins/getSearchSuggestionsInputPersonalization",
        "targetExport": "getSearchSuggestionsInput",
        "targetModule": "@graphcommerce/algolia-products",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "getSearchResultsInput",
        "sourceModule": "@graphcommerce/algolia-personalization/plugins/getSearchResultsInputPersonalization",
        "targetExport": "getSearchResultsInput",
        "targetModule": "@graphcommerce/algolia-products",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "getInContextInput",
        "sourceModule": "@graphcommerce/algolia-personalization/plugins/InContextInputAlgoliaUserToken",
        "targetExport": "getInContextInput",
        "targetModule": "@graphcommerce/graphql",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "useInContextInput",
        "sourceModule": "@graphcommerce/algolia-personalization/plugins/InContextInputAlgoliaUserToken",
        "targetExport": "useInContextInput",
        "targetModule": "@graphcommerce/graphql",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "useSendEvent",
        "sourceModule": "@graphcommerce/algolia-insights/plugins/useSendEventAlgolia",
        "targetExport": "useSendEvent",
        "targetModule": "@graphcommerce/google-datalayer",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "meshConfig",
        "sourceModule": "@graphcommerce/algolia-insights/plugins/meshConfigAlgoliaInsights",
        "targetExport": "meshConfig",
        "targetModule": "@graphcommerce/graphql-mesh/meshConfig",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "getSearchSuggestionsInput",
        "sourceModule": "@graphcommerce/algolia-insights/plugins/getSearchSuggestionsInputInsights",
        "targetExport": "getSearchSuggestionsInput",
        "targetModule": "@graphcommerce/algolia-products",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "getSearchResultsInput",
        "sourceModule": "@graphcommerce/algolia-insights/plugins/getSearchResultsInputInsights",
        "targetExport": "getSearchResultsInput",
        "targetModule": "@graphcommerce/algolia-products",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "meshConfig",
        "sourceModule": "@graphcommerce/algolia-recommend/plugins/meshConfigAlgoliaRecommend",
        "targetExport": "meshConfig",
        "targetModule": "@graphcommerce/graphql-mesh/meshConfig",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "meshConfig",
        "sourceModule": "@graphcommerce/algolia-products/plugins/meshConfigAlgolia",
        "targetExport": "meshConfig",
        "targetModule": "@graphcommerce/graphql-mesh/meshConfig",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "useProductListApplySearchDefaults",
        "sourceModule": "@graphcommerce/algolia-products/plugins/magentoSearchApplyAlgoliaEngine",
        "targetExport": "useProductListApplySearchDefaults",
        "targetModule": "@graphcommerce/magento-search",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "productListApplySearchDefaults",
        "sourceModule": "@graphcommerce/algolia-products/plugins/magentoSearchApplyAlgoliaEngine",
        "targetExport": "productListApplySearchDefaults",
        "targetModule": "@graphcommerce/magento-search",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "searchDefaultsToProductListFilters",
        "sourceModule": "@graphcommerce/algolia-products/plugins/magentoSearchApplyAlgoliaEngine",
        "targetExport": "searchDefaultsToProductListFilters",
        "targetModule": "@graphcommerce/magento-search",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "ProductListItemsBase",
        "sourceModule": "@graphcommerce/algolia-products/plugins/ProductListItemsBaseAlgolia",
        "targetExport": "ProductListItemsBase",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "ProductPageMeta",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerViewItem",
        "targetExport": "ProductPageMeta",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "UpdateItemQuantity",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerUseRemoveItemFromCart",
        "targetExport": "UpdateItemQuantity",
        "targetModule": "@graphcommerce/magento-cart-items",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "ShippingMethodForm",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerShippingMethodForm",
        "targetExport": "ShippingMethodForm",
        "targetModule": "@graphcommerce/magento-cart-shipping-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "useRemoveItemFromCart",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerRemoveItemFromCart",
        "targetExport": "useRemoveItemFromCart",
        "targetModule": "@graphcommerce/magento-cart-items",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "ProductListItemsBase",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerProductListItemsBase",
        "targetExport": "ProductListItemsBase",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "ProductListItem",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerProductListItem",
        "targetExport": "ProductListItem",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "PaymentMethodContextProvider",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerPaymentMethodContextProvider",
        "targetExport": "PaymentMethodContextProvider",
        "targetModule": "@graphcommerce/magento-cart-payment-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "PaymentMethodButton",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerPaymentMethodButton",
        "targetExport": "PaymentMethodButton",
        "targetModule": "@graphcommerce/magento-cart-payment-method",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "CartStartCheckoutLinkOrButton",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerCartStartCheckoutLinkOrButton",
        "targetExport": "CartStartCheckoutLinkOrButton",
        "targetModule": "@graphcommerce/magento-cart",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "CartStartCheckout",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerCartStartCheckout",
        "targetExport": "CartStartCheckout",
        "targetModule": "@graphcommerce/magento-cart",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "AddProductsToCartForm",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerAddProductsToCartForm",
        "targetExport": "AddProductsToCartForm",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "useSignInForm",
        "sourceModule": "@graphcommerce/magento-cart/plugins/useSignInFormMergeCart",
        "targetExport": "useSignInForm",
        "targetModule": "@graphcommerce/magento-customer",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "GraphQLProvider",
        "sourceModule": "@graphcommerce/magento-cart/plugins/MagentoCartGraphqlProvider",
        "targetExport": "GraphQLProvider",
        "targetModule": "@graphcommerce/graphql",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "graphqlConfig",
        "sourceModule": "@graphcommerce/magento-customer/plugins/magentoCustomerRemoveInContextDirective",
        "targetExport": "graphqlConfig",
        "targetModule": "@graphcommerce/graphql",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "getInContextInput",
        "sourceModule": "@graphcommerce/magento-customer/plugins/magentoCustomerGetInContext",
        "targetExport": "getInContextInput",
        "targetModule": "@graphcommerce/graphql",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "useInContextInput",
        "sourceModule": "@graphcommerce/magento-customer/plugins/magentoCustomerGetInContext",
        "targetExport": "useInContextInput",
        "targetModule": "@graphcommerce/graphql",
        "type": "function",
      },
      {
        "enabled": true,
        "ifConfig": [
          "customerXMagentoCacheIdDisable",
          false,
        ],
        "sourceExport": "GraphQLProvider",
        "sourceModule": "@graphcommerce/magento-customer/plugins/XMagentoCacheIdGraphQLProvider",
        "targetExport": "GraphQLProvider",
        "targetModule": "@graphcommerce/graphql",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "GraphQLProvider",
        "sourceModule": "@graphcommerce/magento-customer/plugins/MagentoCustomerGraphqlProvider",
        "targetExport": "GraphQLProvider",
        "targetModule": "@graphcommerce/graphql",
        "type": "component",
      },
      {
        "enabled": true,
        "sourceExport": "meshConfig",
        "sourceModule": "@graphcommerce/magento-graphql/plugins/meshConfigAttrValue",
        "targetExport": "meshConfig",
        "targetModule": "@graphcommerce/graphql-mesh/meshConfig",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "graphqlConfig",
        "sourceModule": "@graphcommerce/magento-graphql/plugins/magentoGraphqlConfig",
        "targetExport": "graphqlConfig",
        "targetModule": "@graphcommerce/graphql",
        "type": "function",
      },
      {
        "enabled": true,
        "sourceExport": "meshConfig",
        "sourceModule": "@graphcommerce/graphql-mesh/plugins/meshConfigFake",
        "targetExport": "meshConfig",
        "targetModule": "@graphcommerce/graphql-mesh/meshConfig",
        "type": "function",
      },
    ]
  `)
  expect(disabled).toMatchInlineSnapshot(`
    [
      {
        "enabled": false,
        "ifConfig": "recentlyViewedProducts.enabled",
        "sourceExport": "ProductPageMeta",
        "sourceModule": "@graphcommerce/magento-recently-viewed-products/plugins/RegisterProductAsRecentlyViewed",
        "targetExport": "ProductPageMeta",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "googleTagmanagerId",
        "sourceExport": "sendEvent",
        "sourceModule": "@graphcommerce/googletagmanager/plugins/tagmanagerEvent",
        "targetExport": "sendEvent",
        "targetModule": "@graphcommerce/google-datalayer",
        "type": "function",
      },
      {
        "enabled": false,
        "ifConfig": "googleTagmanagerId",
        "sourceExport": "DocumentBodyStart",
        "sourceModule": "@graphcommerce/googletagmanager/plugins/GoogleTagmanagerTag",
        "targetExport": "DocumentBodyStart",
        "targetModule": "@graphcommerce/next-ui/server",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "googleTagmanagerId",
        "sourceExport": "DocumentHeadEnd",
        "sourceModule": "@graphcommerce/googletagmanager/plugins/GoogleTagmanagerTag",
        "targetExport": "DocumentHeadEnd",
        "targetModule": "@graphcommerce/next-ui/server",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "compare",
        "sourceExport": "ProductListItem",
        "sourceModule": "@graphcommerce/magento-compare/plugins/CompareAbleProductListItem",
        "targetExport": "ProductListItem",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "compare",
        "sourceExport": "GraphQLProvider",
        "sourceModule": "@graphcommerce/magento-compare/plugins/AddCompareTypePolicies",
        "targetExport": "GraphQLProvider",
        "targetModule": "@graphcommerce/graphql",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "compare",
        "sourceExport": "ProductPageAddToCartActionsRow",
        "sourceModule": "@graphcommerce/magento-compare/plugins/AddCompareToProductPage",
        "targetExport": "ProductPageAddToCartActionsRow",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "compare",
        "sourceExport": "CartFab",
        "sourceModule": "@graphcommerce/magento-compare/plugins/AddCompareFabNextToCart",
        "targetExport": "CartFab",
        "targetModule": "@graphcommerce/magento-cart",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "configurableVariantValues.content",
        "sourceExport": "ProductShortDescription",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductShortDescription",
        "targetExport": "ProductShortDescription",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "configurableVariantValues.content",
        "sourceExport": "ProductPageName",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageName",
        "targetExport": "ProductPageName",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "configurableVariantValues.url",
        "sourceExport": "ProductPageMeta",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageMeta",
        "targetExport": "ProductPageMeta",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "configurableVariantValues.content",
        "sourceExport": "ProductPageJsonLd",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageJsonLd",
        "targetExport": "ProductPageJsonLd",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "configurableVariantValues.content",
        "sourceExport": "ProductPageDescription",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageDescription",
        "targetExport": "ProductPageDescription",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "algolia.catalogEnabled",
        "sourceExport": "useProductListApplyCategoryDefaults",
        "sourceModule": "@graphcommerce/algolia-products/plugins/magentoProductApplyAlgoliaEngine",
        "targetExport": "useProductListApplyCategoryDefaults",
        "targetModule": "@graphcommerce/magento-product",
        "type": "function",
      },
      {
        "enabled": false,
        "ifConfig": "algolia.catalogEnabled",
        "sourceExport": "productListApplyCategoryDefaults",
        "sourceModule": "@graphcommerce/algolia-products/plugins/magentoProductApplyAlgoliaEngine",
        "targetExport": "productListApplyCategoryDefaults",
        "targetModule": "@graphcommerce/magento-product",
        "type": "function",
      },
      {
        "enabled": false,
        "ifConfig": "algolia.catalogEnabled",
        "sourceExport": "categoryDefaultsToProductListFilters",
        "sourceModule": "@graphcommerce/algolia-products/plugins/magentoProductApplyAlgoliaEngine",
        "targetExport": "categoryDefaultsToProductListFilters",
        "targetModule": "@graphcommerce/magento-product",
        "type": "function",
      },
      {
        "enabled": false,
        "ifConfig": "algolia.customerGroupPricingEnabled",
        "sourceExport": "GraphQLProvider",
        "sourceModule": "@graphcommerce/algolia-products/plugins/GraphQLProviderAlgoliaCustomerGroupId",
        "targetExport": "GraphQLProvider",
        "targetModule": "@graphcommerce/graphql",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "dataLayer.coreWebVitals",
        "sourceExport": "FramerNextPages",
        "sourceModule": "@graphcommerce/google-datalayer/plugins/GoogleDatalayerWebVitals",
        "targetExport": "FramerNextPages",
        "targetModule": "@graphcommerce/framer-next-pages",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "debug.sessions",
        "sourceExport": "FramerNextPages",
        "sourceModule": "@graphcommerce/magento-customer/plugins/SessionDebuggerPlugin",
        "targetExport": "FramerNextPages",
        "targetModule": "@graphcommerce/framer-next-pages",
        "type": "component",
      },
      {
        "enabled": false,
        "ifConfig": "previewSecret",
        "sourceExport": "FramerNextPages",
        "sourceModule": "@graphcommerce/ecommerce-ui/plugins/PreviewModeFramerNextPages",
        "targetExport": "FramerNextPages",
        "targetModule": "@graphcommerce/framer-next-pages",
        "type": "component",
      },
    ]
  `)
})
