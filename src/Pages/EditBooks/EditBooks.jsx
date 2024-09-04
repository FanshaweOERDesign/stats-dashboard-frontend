import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EditBookPage = () => {
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookURL, setNewBookURL] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookToDelete, setBookToDelete] = useState(null);
  const [books, setBooks] = useState([]);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewBookTitle("");
    setNewBookURL("");
    setErrorMessage("");
  };

  const handleOpenDeleteModal = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  };

  const handleAddBook = async () => {
    const username = "admin";
    const password = "admin";
    try {
      const response = await fetch("http://localhost:8384/add-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          title: newBookTitle,
          url: newBookURL,
        }),
      });
  
      const result = await response.json();

      console.log(result);
  
      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setBooks((prevBooks) => [...prevBooks, newBookTitle]);
        setErrorMessage(`${newBookTitle} has been added successfully!`);
        sessionStorage.setItem('cachedBooks', JSON.stringify([...books, newBookTitle]));
        handleCloseAddModal();
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while adding the book. Please try again later."
      );
    }
};
  

  const handleConfirmDeleteBook = () => {
    if (bookToDelete) {
      setBooks(books.filter((book) => book !== bookToDelete));
      handleCloseDeleteModal();
    }
  };

  useEffect(() => {
    const cachedBooks = sessionStorage.getItem('cachedBooks');
    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks));
    } else {
      const fetchBooks = async () => {
        try {
          const response = await fetch('http://localhost:8384/get-titles');
          const titles = await response.json();
          setBooks(titles);
          sessionStorage.setItem('cachedBooks', JSON.stringify(titles)); 
        } catch (error) {
          console.error('Error fetching book titles:', error);
        } 
      };

      fetchBooks();
    }
  }, []);


  return (
    <Box
      sx={{
        p: 3,
        mt: 15,
        mb: 15,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Edit Books
      </Typography>
      <Button
        variant="contained"
        sx={{ m: "auto" }}
        onClick={handleOpenAddModal}
      >
        Add Book
      </Button>
      <List sx={{ mt: 2, maxWidth: "1000px", m: "auto" }}>
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleOpenDeleteModal(book)}
                >
                  <DeleteIcon color="primary" />
                </IconButton>
              }
            >
              <ListItemText primary={book} />
            </ListItem>
          ))
        ) : (
          <Typography>No books available</Typography>
        )}
      </List>

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
          <TextField
            label="Book URL"
            value={newBookURL}
            onChange={(e) => setNewBookURL(e.target.value)}
            fullWidth
          />
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

      <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this book? This action is permanent
            and cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Delete
          </Button>{" "}
          {/*add delete function when implemented*/}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditBookPage;
