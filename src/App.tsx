
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TaskManagementApp from './components/TaskManagementApp';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-background">
            <TaskManagementApp />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
