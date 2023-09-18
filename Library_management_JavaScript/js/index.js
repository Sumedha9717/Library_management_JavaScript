let books = [];

function addbook(book) {
  let table = $("#bookTable tbody");
  table.append(`
    <tr id="${book.id}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.year}</td>
        <td>${book.quantity}</td>
        <td>
            <button class=" mb-1 btn btn-sm btn-warning editbtn" data-id="${book.id}">
                EDIT
            </button>
            <button class=" mb-1 btn btn-sm btn-danger deletebtn" data-id="${book.id}">
                DELETE
            </button>
        </td>
    `);
}

function clearForm() {
  $("#bookTitle").val("");
  $("#author").val("");
  $("#genre").val("");
  $("#year").val("");
  $("#quantity").val("");
}

function generateId() {
  return Math.floor(Math.random() * 1000000); //generate random number between [9,8
}

$(document).on("click", "#clearbtn", function () {
  clearForm();
});

$("#bookForm").submit(function (e) {
  e.preventDefault();

  let book = {
    id: generateId(),
    title: $("#bookTitle").val(),
    author: $("#author").val(),
    genre: $("#genre").val(),
    year: $("#year").val(),
    quantity: $("#quantity").val(),
  };

  books.push(book);
  addbook(book);

  clearForm();
});

$("#editForm").submit(function (e) {
  e.preventDefault();

  let bookId = $("#editBookId").val();
  let bookIndex = books.findIndex((book) => book.id == bookId);
  let book = books[bookIndex];

  book.title = $("#editbookTitle").val();
  book.author = $("#editauthor").val();
  book.genre = $("#editgenre").val();
  book.year = $("#edityear").val();
  book.quantity = $("#editquantity").val();

  let row = $(`#${book.id}`);
  row.find("td:eq(0)").text(book.title);
  row.find("td:eq(1)").text(book.author);
  row.find("td:eq(2)").text(book.genre);
  row.find("td:eq(3)").text(book.year);
  row.find("td:eq(4)").text(book.quantity);

  $("#editModal").modal("hide");
});

// $(document).on("click", "#editbtn", function () {
//   let bookId = $(this).data("id");

//   let bookIndex = books.findIndex((book) => book.id == bookId);
//   let book = books[bookIndex];

//   $("#editbookTitle").val(book.title);
//   $("#editauthor").val(book.author);
//   $("#editgenre").val(book.genre);
//   $("#edityear").val(book.year);
//   $("#editquantity").val(book.quantity);
//   $("#editBookId").val(book.id);

//   $("#editModal").modal("show");
// });

$(document).on("click", ".editbtn", function() {
    let bookId = $(this).data("id");

    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];

    $("#editbookTitle").val(book.title);
    $("#editauthor").val(book.author);
    $("#editgenre").val(book.genre);
    $("#edityear").val(book.year);
    $("#editquantity").val(book.quantity);
    $("#editBookId").val(book.id);

    $("#editModal").modal("show");
});

$(document).on("click", "#closebtn", function () {
  $("#editModal").modal("hide");
});

// $(document).on("click", "#deletebtn", function () {
//   let bookId = $(this).data("id");
//   let bookIndex = books.findIndex((book) => book.id == bookId);
//   let book = books[bookIndex];

//   if (confirm(`Are you sure you want to delete ${book.title}`)) {
//     books.splice(bookIndex, 1);
//     $(`#${book.id}`).remove();
//   }
// });

$(document).on("click", ".deletebtn", function() {
    let bookId = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];

    if (confirm(`Are you sure you want to delete ${book.title}`)) {
        books.splice(bookIndex, 1);
        $(`#${book.id}`).remove();
    }
});
