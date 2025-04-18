// api.js - Create a new file to manage API interactions

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Create a utility function to show loading indicator
function showLoading(show = true) {
  const loadingElement = document.getElementById('loading-indicator');
  if (show) {
    loadingElement.style.display = 'flex';
  } else {
    loadingElement.style.display = 'none';
  }
}

// Get all notes
async function getNotes() {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await response.json();
    showLoading(false);
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    return responseJson.data;
  } catch (error) {
    console.error('Error getting notes:', error);
    showNotification('Error: ' + error.message, 'error');
    showLoading(false);
    return [];
  }
}

// Add a new note
async function addNote(title, body) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    
    const responseJson = await response.json();
    showLoading(false);
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    showNotification('Note added successfully!', 'success');
    return responseJson.data;
  } catch (error) {
    console.error('Error adding note:', error);
    showNotification('Error: ' + error.message, 'error');
    showLoading(false);
    return null;
  }
}

// Delete a note
async function deleteNote(id) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    
    const responseJson = await response.json();
    showLoading(false);
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    showNotification('Note deleted successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    showNotification('Error: ' + error.message, 'error');
    showLoading(false);
    return false;
  }
}

// Archive a note
async function archiveNote(id) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });
    
    const responseJson = await response.json();
    showLoading(false);
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    showNotification('Note archived successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error archiving note:', error);
    showNotification('Error: ' + error.message, 'error');
    showLoading(false);
    return false;
  }
}

// Unarchive a note
async function unarchiveNote(id) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });
    
    const responseJson = await response.json();
    showLoading(false);
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    showNotification('Note unarchived successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error unarchiving note:', error);
    showNotification('Error: ' + error.message, 'error');
    showLoading(false);
    return false;
  }
}

// Get archived notes
async function getArchivedNotes() {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const responseJson = await response.json();
    showLoading(false);
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    return responseJson.data;
  } catch (error) {
    console.error('Error getting archived notes:', error);
    showNotification('Error: ' + error.message, 'error');
    showLoading(false);
    return [];
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}