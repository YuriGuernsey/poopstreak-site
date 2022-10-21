const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdWpxaHVmYXV0amZuZ2Fta29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwNDcwMTQsImV4cCI6MTk4MDYyMzAxNH0.B1XSbe_I3s3wq5L3kjoxmd1wgA7aV2VaKal5I67QT14";

const url = "https://jsujqhufautjfngamkop.supabase.co";

const database = supabase.createClient(url, key);

let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    let country = document.querySelector("#country").value;
    save.innerText = "Saveing....";
    save.setAttribute("disabled", true);
    let res = await database.from("students").insert({
        name: name,
        age: age,
        country: country
    })
    if (res) {
        alert("Student Add Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
        name = "";
        age = "";
        country = "";
        getStudent();
        getTotalCount();


    } else {
        alert("Student Not Add Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
    }
})

const getPosts = async () => {
  
    loading.innerText = "Loadding...."
    const res = await database.from("posts").select("*");
    if (res) {
        for (var i in res.data) {
            document.querySelector('#posts').insertAdjacentHTML('beforeend',"<div class=\"card\"><div class=\"card-body\"><h5 class=\"card-title\">" + res.data[i].title+ "</h5><p class=\"card-text\">" + res.data[i].post + "</p></div></div>");
        loading.innerText = "";
        }
    }

}

getPosts();

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await database.from("students").select("*", { count: "exact" });
    total.innerText = res.data.length;
}

getTotalCount();

const editStudent = async (id) => {


    const res = await database.from("students").select("*").eq("id", id);
    if (res) {
        document.getElementById("id").value = res.data[0].id;
        document.getElementById("edit-name").value = res.data[0].name;
        document.getElementById("edit-age").value = res.data[0].age;
        document.getElementById("edit-country").value = res.data[0].country;
    }
}

const update = document.getElementById("update");

update.addEventListener("click", async () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("edit-name").value
    let age = document.getElementById("edit-age").value;
    let country = document.getElementById("edit-country").value;
    update.innerText = "Updateing...."
    update.setAttribute("disabled", true);
    const res = await database.from("students").update({
        name, age, country
    }).eq("id", id)

    if (res) {
        alert("Student Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
        name = "";
        age = "";
        country = "";
        getStudent();
        getTotalCount();

    } else {
        alert("Student Not Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
    }
})


const deleteStudent = async (id) => {
    const res = await database.from("students").delete().eq("id", id)

    if (res) {
        alert("Delete successfully")
        getStudent();
        getTotalCount();

    } else {
        alert("Delete successfully")
    }
}
