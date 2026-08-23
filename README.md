# ERM-AI-System
AI-based system for real-time emergency incident detection, severity classification, and smart dispatch optimization using ML, IoT, and federated learning.


emergency-response-app/
├── frontend/                   # React.js SPA (Vite/CRA)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Live operational overview & system status
│   │   │   ├── Map.jsx         # Geospatial interface for real-time tracking
│   │   │   ├── ReportIncident.jsx # Form intake for active emergency reporting
│   │   │   ├── Dispatch.jsx    # First responder routing & assignment hub
│   │   │   └── Analytics.jsx   # Historical trends & ML forecasting visualizations
│   │   ├── components/         # Reusable UI components (Modals, Cards, Navs)
│   │   └── App.jsx             # Main router & global state providers
├── backend/                    # FastAPI application
│   ├── main.py                 # Application entry point & middleware configuration
│   ├── model/
│   │   ├── classifier.pkl      # Scikit-learn model for incident triage & severity scoring
│   │   └── lstm_model.h5       # Keras LSTM model for spatial-temporal event forecasting
│   ├── routes/
│   │   ├── predict.py          # REST endpoints for ML model execution
│   │   └── dispatch.py         # Route logic for responder assignments and GPS queues
│   └── database.py             # SQLAlchemy configuration & database session setup
└── README.md                   # System documentation
