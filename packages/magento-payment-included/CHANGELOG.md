# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-included@2.103.0...@graphcommerce/magento-payment-included@2.103.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-payment-included





# 2.103.0 (2021-09-27)


### Bug Fixes

* **checkout:** purchaseorder and other build in methods wouldnt properly submit ([331cb8e](https://github.com/ho-nl/m2-pwa/commit/331cb8e2bed58c14cd41fceeab03e2cdfbe7e6a9))
* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
* implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
* paymentDone removed in favor of a more simple clearCart method ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))
* **playwright:** checkout button was renamed ([09e5b79](https://github.com/ho-nl/m2-pwa/commit/09e5b79333708cfac04232d8071d1dad72968297))


### Features

* **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
* **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
* implemented checkmo payment method ([18525b2](https://github.com/ho-nl/m2-pwa/commit/18525b2f4efe9bd0eea12a7a992d284f341e0c68))
* implemented purchase order ([3a40033](https://github.com/ho-nl/m2-pwa/commit/3a40033cd4d6712a17bb9c41a8841ebf7aa2f025))
* **mollie:** first version of mollie payment methods ([e2f7d78](https://github.com/ho-nl/m2-pwa/commit/e2f7d78e50a9afe928f1d8c478f946e03c63b0f2))
* next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
* only show free payment method when zero subtotal quote ([fd3ba86](https://github.com/ho-nl/m2-pwa/commit/fd3ba86d3060ebe7dc72ce27fca21464b46b4392))
* **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
* **react-hook-form:** added buttonState to ComposedSubmit ([57e77c2](https://github.com/ho-nl/m2-pwa/commit/57e77c29f17720f7f3ee3b63be82779c0e5d8714))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
* solve issue where the order couldn’t be submitted ([ec0d357](https://github.com/ho-nl/m2-pwa/commit/ec0d3579a1277976e2dc515f420996cf716f83a6))
* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
* useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))


### Reverts

* Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.102.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-included@2.102.6...@graphcommerce/magento-payment-included@2.102.7) (2021-08-17)

### Bug Fixes

- **playwright:** checkout button was renamed
  ([09e5b79](https://github.com/ho-nl/m2-pwa/commit/09e5b79333708cfac04232d8071d1dad72968297))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-included@2.101.10...@graphcommerce/magento-payment-included@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-included@2.101.8...@graphcommerce/magento-payment-included@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-included@2.101.2...@graphcommerce/magento-payment-included@2.101.3) (2021-07-29)

### Bug Fixes

- paymentDone removed in favor of a more simple clearCart method
  ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-included@2.100.19...@graphcommerce/magento-payment-included@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-included@2.100.10...@graphcommerce/magento-payment-included@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
