import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate('firebase_credentials.json') 
firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()
