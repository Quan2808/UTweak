import React, { useState, useEffect } from 'react';
import { Card, CardBody, Spinner } from '@material-tailwind/react';

// Import components
import Header from './components/Header';
import FeatureToggle from './components/FeatureToggle';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';

export default function Popup() {
  const [settings, setSettings] = useState({
    autoConfirmEnabled: true,
    logoReplaceEnabled: true,
    adCleanupEnabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadSettings();
    loadStats();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'getSettings' });
      if (response.success) {
        setSettings(response.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'getStats' });
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleToggle = async (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    setSaving(true);

    try {
      await chrome.runtime.sendMessage({
        action: 'updateSettings',
        settings: newSettings,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      setSettings(settings); // revert
    } finally {
      setSaving(false);
    }
  };

  const handleRefreshPage = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.url?.includes('youtube.com')) {
      chrome.tabs.reload(tab.id);
      window.close();
    }
  };

  if (loading) {
    return (
      <div className="w-80 h-96 flex items-center justify-center bg-gray-50">
        <Spinner className="h-12 w-12" color="red" />
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-50">
      <Card className="shadow-lg">
        <Header stats={stats} />

        <CardBody className="p-4 space-y-4">
          <FeatureToggle
            title="Auto Confirm"
            description="Automatically confirms 'Continue watching?' prompts"
            checked={settings.autoConfirmEnabled}
            onChange={() => handleToggle('autoConfirmEnabled')}
            disabled={saving}
          />

          <FeatureToggle
            title="Custom Logo"
            description="Replace YouTube logo with custom design"
            checked={settings.logoReplaceEnabled}
            onChange={() => handleToggle('logoReplaceEnabled')}
            disabled={saving}
          />

          <FeatureToggle
            title="Ad Cleanup"
            description="Remove promotional content and ads from feed"
            checked={settings.adCleanupEnabled}
            onChange={() => handleToggle('adCleanupEnabled')}
            disabled={saving}
          />

          <ActionButtons onRefresh={handleRefreshPage} saving={saving} />
        </CardBody>
      </Card>

      <Footer />
    </div>
  );
}