# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphql@2.103.0...@graphcommerce/magento-graphql@2.103.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-graphql





# 2.103.0 (2021-09-27)


### Bug Fixes

* **cart:** invariant violation value_id not found ([c6db986](https://github.com/ho-nl/m2-pwa/commit/c6db986aa411915f344006d16c222b3621e2f4fc))
* category children and swatch renderer ([1ee008d](https://github.com/ho-nl/m2-pwa/commit/1ee008d9ecf3bf5ec4b2d82243e4bcbbec384411))
* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
* review pagination and sign in using type policies ([ab16659](https://github.com/ho-nl/m2-pwa/commit/ab16659caaa846d6728a3f3f6bcf5d7cb2f55b18))
* yarn workspace packages hot reload ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))


### Features

* apollo error full page component ([fc1e695](https://github.com/ho-nl/m2-pwa/commit/fc1e695251a8792abaec5b9382e8301d3794cb6d))
* better 404 handling and simplified getStaticProps ([321ace1](https://github.com/ho-nl/m2-pwa/commit/321ace1850642ee3eddfa674c37e6fca8adcdb74))
* better sign in form handling ([6ac339f](https://github.com/ho-nl/m2-pwa/commit/6ac339fdfa1ece959cc8548e5bfadfca7c1f5cf6))
* created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
* **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
* i18n routing added (/ and /fr for demo) ([bb3b339](https://github.com/ho-nl/m2-pwa/commit/bb3b339fbc9fceddd264a891ad81f00327a241ae))
* implemented checkmo payment method ([18525b2](https://github.com/ho-nl/m2-pwa/commit/18525b2f4efe9bd0eea12a7a992d284f341e0c68))
* improved drawer stacking and stable layoutId support ([b5b0406](https://github.com/ho-nl/m2-pwa/commit/b5b040635993eb3da819606e94d3cd6fdaddb05c))
* **magento-customer:** introduced ApolloCustomerErrorAlert ([e5406d9](https://github.com/ho-nl/m2-pwa/commit/e5406d91f914de290c5f097955e312312e567972))
* **magento-graphql:** added core magentoTypePolicies ([bdf15d0](https://github.com/ho-nl/m2-pwa/commit/bdf15d0d3c04e88339a8385d76f3b1ab9589fde3))
* major performance refactor ([03f8e2f](https://github.com/ho-nl/m2-pwa/commit/03f8e2fa16ef919bd6bd6eadd36922d0245ed960))
* next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
* **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
* product page review pagination ([4e18395](https://github.com/ho-nl/m2-pwa/commit/4e18395944c08e195fd09192086301c695d044ed))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
* support vscode graphql extension ([9324507](https://github.com/ho-nl/m2-pwa/commit/9324507c3c149fbcb7cd51ac41250a8637521ceb))
* upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
* working on EmailForm ([f16141f](https://github.com/ho-nl/m2-pwa/commit/f16141f8cc0dfeaef8dee2a3e635bda898550a51))


### Reverts

* Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))



## 2.0.8 (2020-10-28)


### Bug Fixes

* exclusively use Magento endpoint for magento codegen packages ([deafc42](https://github.com/ho-nl/m2-pwa/commit/deafc423ca0831853ac070e947b900ece565fa65))


### Features

* added generated graphql.ts files ([3e44415](https://github.com/ho-nl/m2-pwa/commit/3e44415b018e74b502e9e98479aa5e84041f337d))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphql@2.101.3...@graphcommerce/magento-graphql@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphql@2.101.2...@graphcommerce/magento-graphql@2.101.3) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-graphql@2.100.10...@graphcommerce/magento-graphql@2.101.0) (2021-07-26)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
