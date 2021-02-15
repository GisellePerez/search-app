## Getting started

1. Clone repository

2. Start frontend:

   - `cd frontend`
   - `npm install`
   - `npm start`

3. Start server
   - `cd server`
   - `npm install`
   - `npm start`

---

## Tech stack

- React + TypeScript
- Styled Component
- Nodejs (Express)
- Conventional commits

---

## Using the app

After cloning the repo, installed the dependencies and started the app, go to [localhost:3000](localhost:3000)

### **Search items with search bar**

The first thing you'll find when you use the app is the search bar. Type the name of your item ofinterest and a list of those items will be displayed

### **Search by url params**

Apart from using the search bar, you'll be able to search for itmes through url params adding `/items?search=[ITEM]` to the base url.

E.g.: [http://localhost:3000/items?search=celular](http://localhost:3000/items?search=celular)

### **Navigating to item detail**

You can see a detailed view of the item, by clicking one of the items of the list or by typing the item's id on the url.

E.g: [http://localhost:3000/items/MLA904399939](http://localhost:3000/items/MLA904399939)

---

You can check the [architecture](docs/ARCHITECTURE.md)
