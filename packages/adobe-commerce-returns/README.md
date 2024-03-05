# Adobe Commerce Returns

Implements the returns GraphQL API functionality for Adobe Commerce.

UI will be modeled after:
https://experienceleague.adobe.com/docs/commerce-admin/stores-sales/order-management/returns/rma-customer-experience.html?lang=en

## 1a) Customer: RequestReturn

As a customer want to be able to select my order
(OrdersEligibleForReturns.graphql) for which I want to create a return.

As a customer I want to be able to select items, select the quantity to return,
and fill in entered and selected custom attributes (based on the
ReturnsAttributeList.graphql result)

As a customer I want to be able to fill in my contact email and comment text.

Limtation: We'd like to only support 'select' and 'text' attributes at the
moment.

## 1b) Guest: RequestReturn

There is no API endpoint to be able to create a return as a guest.

## 2a) Customer flow: AddReturnTracking / RemoveReturnTracking

Note: It seems that a tracking_number is required in this case, so the usecase
probably is: A customer brings their package to a shipping carrier and will
receive a tracking number and should add it with this mutation.

As a user I want to be able to select my shipping carrier based on the
available_shipping_carriers in the Return_Details.graphql result.

## 2b) Admin flow: Return tracking is created in the admin

Shipping tracking is created in the admin and the customer can see it on their
Return.

Note: There is no specific integration with a label printing service for a
specific carrier as that is not a generic feature and would be an additional
add-on.

## Customer account section:

As a customer I want to be able to see the details of my return.

As a customer I want to be able to add a comment to my return so we can have a
conversation with the store. (If this is important, this could be rendered as a
chat-like interface.)

As a customer I want to be able to see an overview of my return.

As a customer I want to be able to create a return from my order
