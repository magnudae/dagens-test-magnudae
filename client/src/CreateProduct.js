
const category = [
  { value: 'meat', label: 'Meat' },
  { value: 'fish', label: 'Fish' },
  { value: 'greens', label: 'Greens' }
]

const CreateProduct = () => (
  <div >
    <h3> Input information to add a product</h3>
    <form className="flex column" method="post" action="http://localhost:3001/create-product">
      <input type="text" name="name" placeholder="Input name"></input>
      <select>
        {category.map(cat => <option name="category" value={cat.value}>{cat.label}</option>)}
      </select>
      <input type="number" name="price" placeholder="Price"></input>
      <button type="submit"> Create product</button>
    </form>
  </div>
);

export default CreateProduct;
