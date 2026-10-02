const userList = document.getElementById("userList");
const searchInput = document.getElementById("searchInput");

let allUsers = [];

function renderUsers(users) {
  userList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.email} (${user.address.city})`;
    userList.appendChild(li);
  });
}

async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    allUsers = await response.json();
    renderUsers(allUsers);
  } catch (error) {
    console.log(error);
  }
}

searchInput.addEventListener("input", () => {
  const text = searchInput.value.trim().toLowerCase();

  const matches = allUsers.filter((user) =>
    user.name.toLowerCase().includes(text),
  );

  renderUsers(matches);
});

loadUsers();
