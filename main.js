// get elements
let title    = document.getElementById('title');
let price    = document.getElementById('price');
let taxes    = document.getElementById('taxes');
let ads      = document.getElementById('ads');
let discount = document.getElementById('discount');
let total    = document.getElementById('total');
let count    = document.getElementById('count');
let category = document.getElementById('category');
let submit   = document.getElementById('submit');
let mood = 'create';
let tmp;



// get total
function getTotal()
{
    if( price.value != '' ){
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = "#029a11d8";
    }else{
        total.style.backgroundColor = "#05b1cf99";
        total.innerHTML = '';
    }
}



// create product

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}


submit.onclick = function()
{
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    // count
    if(title.value != ''
    && price.value != ''
    && category.value != ''
    && newPro.count <= 100 ){
        if (mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push (newPro);
                }
            }else{
                dataPro.push (newPro);
            }
        }else{
            dataPro[ tmp ] = newPro;
            mood = 'create';
            getTotal();
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    
    }
    
    
    localStorage.setItem("product", JSON.stringify(dataPro))

    
    readData();
}



// clear inputs after creation
function clearData()
{
    title.value    = '';
    price.value    = '';
    taxes.value    = '';
    ads.value      = '';
    discount.value = '';
    total.innerHTML= '';
    count.value    = '';
    category.value = '';
}

// read : make the created elements visible in the table
function readData() 
{
    getTotal();
    let table = '';

    for(let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    

    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0)
    {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML = '';
    }
}
readData();

// delete :

// 1- delete single product
function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    readData();
}

// 2- delete all product at one time
function deleteAll()
{
    localStorage.clear("product");
    dataPro.splice(0);
    readData();
}

// update
function updateData(i)
{
    title.value         = dataPro[i].title;
    price.value         = dataPro[i].price;
    taxes.value         = dataPro[i].taxes;
    ads.value           = dataPro[i].ads;
    discount.value      = dataPro[i].discount;
    category.value      = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML    = `Update`;
    getTotal();
    mood                = 'update';
    tmp                 = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}


// search 
let searchMode = 'title';

function getSearchMode(id)
{
    let search = document.getElementById('search');
    if(id === 'searchTitle'){
        searchMode='title';
        search.placeholder="Search By Title";
    }else{
        searchMode='category';
        search.placeholder="Search By Category";
    }
    search.focus();
    search.value = '';
    readData();
}

function searchData(value)
{
    let table = '';
    if(searchMode === 'title')
    {
        
        for(let i = 0; i < dataPro.length; i++)
        {
            if( dataPro[i].title.includes(value.toLowerCase()) )
            {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `
            }
        }
    }
    
    
    else{

        for(let i = 0; i < dataPro.length; i++)
        {
            if( dataPro[i].category.includes(value.toLowerCase()) )
            {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// cleanData
