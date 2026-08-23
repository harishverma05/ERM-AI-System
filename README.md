# ERM-AI-System
AI-based system for real-time emergency incident detection, severity classification, and smart dispatch optimization using ML, IoT, and federated learning.


graph TD
    %% Global Styling
    classDef main fill:#1E293B,stroke:#38BDF8,stroke-width:2px,color:#FFF;
    classDef layer fill:#334155,stroke:#94A3B8,stroke-width:1px,color:#FFF;
    classDef file fill:#F8FAFC,stroke:#CBD5E1,stroke-width:1px,color:#0F172A;
    classDef ml fill:#FEF2F2,stroke:#EF4444,stroke-width:2px,color:#991B1B;

    %% Root System
    Root[emergency-response-app]:::main

    %% Core Components Split
    Root --> Frontend[frontend / React.js SPA]:::layer
    Root --> Backend[backend / FastAPI Application]:::layer
    Root --> RM[README.md System Docs]:::file

    %% Frontend Page Expansion
    subgraph Frontend Subsystem [Frontend Pages & Core]
        Frontend --> App[App.jsx Router & Global State]:::file
        Frontend --> Comp[components / Reusable UI Modals, Cards, Navs]:::file
        Frontend --> Pages[src / pages]:::layer
        
        Pages --> Dash[Dashboard.jsx Live Operational Status]:::file
        Pages --> Map[Map.jsx Geospatial Tracking]:::file
        Pages --> Report[ReportIncident.jsx Intake Form]:::file
        Pages --> DispatchPg[Dispatch.jsx Responder Assignment Hub]:::file
        Pages --> Analytics[Analytics.jsx Trend & Forecast Visuals]:::file
    end

    %% Backend Service Expansion
    subgraph Backend Subsystem [Backend Services & Engine]
        Backend --> Main[main.py App Entry & Middleware]:::file
        Backend --> DB[database.py SQLAlchemy & Sessions]:::file
        
        Backend --> Routes[routes / Core Logic]:::layer
        Routes --> PredictRt[predict.py REST Endpoints for ML Models]:::file
        Routes --> DispatchRt[dispatch.py Assignments & GPS Queues]:::file
        
        Backend --> Model[model / Intelligent Layer]:::layer
        Model --> Classify[classifier.pkl Scikit-learn Severity Triage]:::ml
        Model --> LSTM[lstm_model.h5 Keras Spatial-Temporal Forecaster]:::ml
    end

    %% Cross-Layer Functional Data Flows
    PredictRt -.-> Classify
    PredictRt -.-> LSTM
    Analytics -.-> PredictRt
    DispatchPg -.-> DispatchRt
