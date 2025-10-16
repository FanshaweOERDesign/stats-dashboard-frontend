import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination
} from "@mui/material";
import useAuth from "../../Hooks/useAuth";

const EditBookPage = ({ isLoggedIn, logout }) => {
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookURL, setNewBookURL] = useState("");
  const [newBookFaculty, setNewBookFaculty] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookToEdit, setBookToEdit] = useState(null);
  const [books, setBooks] = useState([]);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [listPage, setListPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewBookTitle("");
    setNewBookURL("");
    setNewBookFaculty("");
    setErrorMessage("");
  };

  const handleOpenEditModal = (book) => {
    setBookToEdit(book);
    setNewBookTitle(book.title || "");
    setNewBookURL(book.url || "");
    setNewBookFaculty(book.faculty || "");
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setBookToEdit(null);
    setErrorMessage("");
  };

  useEffect(() => {
    if (!bookToEdit) {
      setNewBookTitle("");
      setNewBookURL("");
      setNewBookFaculty("");
    }
  }, [bookToEdit]);

  const handleSessionExpired = () => {
    logout();
    navigate("/login", { state: { message: "Session expired. Please log in again." } });
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch("/add-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          title: newBookTitle,
          url: newBookURL,
          faculty: newBookFaculty,
        }),
      });

      if (response.status === 401 || response.status === 403) {
        handleSessionExpired();
        return;
      }

      const result = await response.json();

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        const updatedBooks = [...books, { title: newBookTitle, url: newBookURL, faculty: newBookFaculty, _id: result.id }];
        setBooks(updatedBooks);
        sessionStorage.setItem("cachedBooks", JSON.stringify(updatedBooks));
        handleCloseAddModal();
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the book. Please try again later.");
    }
  };

  const handleSaveEdit = async () => {
    if (!bookToEdit || !bookToEdit._id) {
      setErrorMessage("Invalid book selected for editing.");
      return;
    }
    try {
      const response = await fetch("/update-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          id: bookToEdit._id,
          title: newBookTitle,
          url: newBookURL,
          faculty: newBookFaculty,
        }),
      });

      if (response.status === 401 || response.status === 403) {
        handleSessionExpired();
        return;
      }

      const result = await response.json();

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        const updatedBooks = books.map((book) =>
          book._id === bookToEdit._id ? { ...book, title: newBookTitle, url: newBookURL, faculty: newBookFaculty } : book
        );
        setBooks(updatedBooks);
        sessionStorage.setItem("cachedBooks", JSON.stringify(updatedBooks));
        handleCloseEditModal();
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the book.");
    }
  };

  const handleDeleteBook = async () => {
    if (!bookToEdit || !bookToEdit._id) {
      setErrorMessage("Invalid book selected for deletion.");
      return;
    }
    if (!deleteConfirmed) {
      const userConfirmed = window.confirm("Are you sure you want to delete this book?");
      if (userConfirmed) {
        setDeleteConfirmed(true);
      } else {
        setDeleteConfirmed(false);
        handleCloseEditModal();
        return;
      }
    }
    try {
      const response = await fetch("/remove-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ id: bookToEdit._id }),
      });

      if (response.status === 401 || response.status === 403) {
        handleSessionExpired();
        return;
      }

      const result = await response.json();

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        const updatedBooks = books.filter((book) => book._id !== bookToEdit._id);
        setBooks(updatedBooks);
        sessionStorage.setItem("cachedBooks", JSON.stringify(updatedBooks));
        handleCloseEditModal();
      }
    } catch (error) {
      setErrorMessage("An error occurred while deleting the book.");
    } finally {
      setDeleteConfirmed(false);
    }
  };

  useEffect(() => {
    let updatedBooks = [...books];

    if (query) {
      updatedBooks = updatedBooks.filter((book) =>
        (book.title || "").toLowerCase().includes(query.toLowerCase())
      );
    }

    updatedBooks.sort((a, b) =>
      sortAsc
        ? (a.title || "").localeCompare(b.title || "")
        : (b.title || "").localeCompare(a.title || "")
    );

    const totalPages = Math.ceil(updatedBooks.length / itemsPerPage);

    // Apply pagination slice
    const startIndex = (listPage - 1) * itemsPerPage;
    const paginatedBooks = updatedBooks.slice(startIndex, startIndex + itemsPerPage);

    setTotalPages(totalPages);
    setFilteredBooks(paginatedBooks);
  }, [books, query, sortAsc, listPage]);

  useEffect(() => {
    setListPage(1);
  }, [query]);


  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const cachedBooks = sessionStorage.getItem("cachedBooks");
    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks));
    } else {
      const fetchBooks = async () => {
        try {
          const response = await fetch("/get-titles");
          const titles = await response.json();
          setBooks(titles);
          sessionStorage.setItem("cachedBooks", JSON.stringify(titles));
        } catch (error) {
          console.error("Error fetching book titles:", error);
        }
      };
      fetchBooks();
    }
  }, [navigate]);

  return (
    <Box sx={{ p: 3, mt: 15, mb: 15, display: "flex", flexDirection: "column", alignContent: "center" }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Edit Books
      </Typography>
      <Button variant="contained" sx={{ m: "auto" }} onClick={handleOpenAddModal}>
        Add Book
      </Button>
      <Box
        sx={{
          mt: 2,
          textAlign: "center",
          border: "1px solid #ccc",
          p: 3,
          borderRadius: 2,
          maxWidth: 600,
          mx: "auto",
          boxShadow: 2
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mt: 2, mb: 2, width: "80%" }}
        />
        <List sx={{ mt: 2 }}>
          {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleOpenEditModal(book)}
                sx={{ justifyContent: "center" }}
              >
                <ListItemText
                  primary={book.title || book}
                  sx={{ textAlign: "left" }}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No books available</Typography>
          )}
        </List>
        <Pagination
          count={totalPages}
          page={listPage}
          onChange={(e, value) => {setListPage(value); window.scrollTo({ top: 0, behavior: 'smooth' });}}
          sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}
        />
      </Box>
      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Book Title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField label="Book URL" value={newBookURL} onChange={(e) => setNewBookURL(e.target.value)} fullWidth />
          <TextField label="Faculty" value={newBookFaculty} onChange={(e) => setNewBookFaculty(e.target.value)} fullWidth />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="contained" onClick={handleAddBook}>
            Add Book
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Book Title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField label="Book URL" value={newBookURL} onChange={(e) => setNewBookURL(e.target.value)} fullWidth sx={{ mb: 2, mt: 2 }} />
          <TextField label="Faculty" value={newBookFaculty} onChange={(e) => setNewBookFaculty(e.target.value)} fullWidth sx={{ mb: 2, mt: 2 }} />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteBook} color="error">
            Delete
          </Button>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditBookPage;
