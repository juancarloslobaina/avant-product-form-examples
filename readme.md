# Product Form Library Examples

There are many products available in the Avant2 marketplace. Most of them define a set of specific options that need
to be provided in order to complete the rating of the risk covered by the insurance. These options are defined by
vendors themselves and vary substantially from one vendor to another and, sometimes, even across products of the same
vendor. Collecting these options in a front-end app, and maintaining these forms whenever the vendor introduces
changes in the product, would be highly cumbersome and costly for clients of this API. To avoid this burden, we make
available a JavaScript library that can be easily integrated in front-end apps to render any product form inside an
[iframe](https://html.spec.whatwg.org/#the-iframe-element) and let the users interact with
it to select the appropriate options for the insurance.

By leveraging the `Product Form` JavaScript library in your apps, your users will be able to input the specific
options of each product and you will obtain the output as a JSON object that can be used to
[quote and insurance project](https://portal.api.codeoscopic.io/#post-/insurances) or [re-rate an insurance offer](https://portal.api.codeoscopic.io/#post-/insurances/-id-/offers).

This library will be regularly updated to reflect changes in the products, so it's always in sync with the
vendor's requirements and you don't have to worry about product variability.

**Note:** You can obtain quotes from the API without using this library. Avant2 defines proper default options for
each product and also allows you to configure these default options for most products. However, if you plan on using
this API to complete the rating of these quotes and issue insurance applications, depending on the product you
will probably be required to specify the final value for certain options in order to achieve these goals.
Alternatively, you can always complete the rating of these quotes and issue insurance applications through the
[Avant2 app](https://app.avant2.es).

See more information in our [api portal](https://portal.api.codeoscopic.io/#overview--product-form-library).

## Available examples

### [NodeJS with pure JavaScript](./node-javascript)

This example shows how to use the library in a NodeJS app with pure JavaScript.
