PO SUPPLIER

SEARCH SUPPLIER NAME V
ITEM -> BASED ON SUPPLIER V
ON DROP DOWN (PACKAGING VOLUME + PACKAGING TYPE) V

PO SUPPLIER PRINT CALCULATIONS
PRINT SEMUA STATUS, DRAFT UPDATE STATUS
TOTAL = PRICE/KG \* NET WEIGHT V

PO SUPPLIER STATUS = DRAFT
EDIT PO NUMBER V

Create Invoice Po
customer name search V
item packaging volume & type V

CUSTOMER DETAIL -> DETAIL -> CREATE ITEM ADD SUPPLIER, ITEM BASED ON SUPPLIER V

PO PENDING
CREATE -> ITEM -> BASED ON CUSTOMER ITEM

INVOICE ORDER
TOTAL PRICE -> RP V
PRINT ON ALL STATUS V
TABLE -> CREATED AT V

STOCK
TABLE -> PACKING TYPE V
TOTAL = VOLUME \* QTY V

TOTAL QTY BASED ON SEARCH V

REPORT
TOTAL VOLUME & PRICE V
FILTER SUPPLIER NAME V
FILTER CUSTOMER NAME V

TABLE V
CUSTOMER NAME
SUPPLIER NAME
ITEM NAME
QTY HIDE
PACKAGING(Kg) -> packing - kg
VOLUME
ITEM PRICE(USD) -> currency
CURS DOLLAR -> exchange_rate
DPP IDR
DPP USD
IDR Price
TAX
Total Price
Travel Permit Number
PIC
Print Date

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

// Item Detail
// 2. Stock List
// Field:
// 1. Lot Number
// 2. Quantity
// 3. Quantity Type
// 4. Buy Price (USD)
// 5. Created At -> kpn msk inventory
// Field:
// 1. Name - search
// 2. Supplier Name - search
// 3. Serial Number

// Update item

// PO Creation
// 1. Supplier Name > get supplier name > dropdown
// query_item_supplier_name > query_item_name

// 1. Item ID (List all item -> search by supplier (1st) & item name)
// 2. Total Quantity (number)
// 3. Quantity Type (ex. drum, sak, dll)
// 4. Buying Price (USD) - > float 2 digit
// 5. Lot Number
// 3. PO Confirmation ->

// PO LIST
// 3. PO History
// Field:
// 1. ID
// 2. Supplier Name - search
// 3. Status
// 4. ETA
// 5. ETD
// button confirm > modal > input eta && etd > status confirm
// complete button > (status confirm > completed > stock update)
