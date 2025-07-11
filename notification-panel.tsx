"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, MessageSquare, TestTube, CheckCircle } from "lucide-react"
import { useNotifications } from "@/services/notification-service"

export function NotificationPanel() {
  const [telegramConfig, setTelegramConfig] = useState({
    botToken: "",
    chatId: "",
    enabled: true,
  })

  const [emailConfig, setEmailConfig] = useState({
    email: "",
    enabled: true,
  })

  const [notificationTypes, setNotificationTypes] = useState({
    trades: true,
    errors: true,
    lowBalance: true,
    botStatus: true,
    dailyReport: true,
  })

  const [testResult, setTestResult] = useState<string | null>(null)
  const notifications = useNotifications()

  const testTelegram = async () => {
    try {
      await notifications.sendTelegramNotification({
        type: "INFO",
        title: "Test de Telegram",
        message: "¡Configuración de Telegram funcionando correctamente! 🎉",
      })
      setTestResult("✅ Telegram configurado correctamente")
    } catch (error) {
      setTestResult("❌ Error en configuración de Telegram")
    }
  }

  const testEmail = async () => {
    try {
      await notifications.sendEmailNotification({
        type: "INFO",
        title: "Test de Email",
        message: "¡Configuración de email funcionando correctamente! 🎉",
      })
      setTestResult("✅ Email configurado correctamente")
    } catch (error) {
      setTestResult("❌ Error en configuración de email")
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuración de Telegram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />📱 Configuración de Telegram
          </CardTitle>
          <CardDescription>Recibe notificaciones instantáneas en tu Telegram personal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={telegramConfig.enabled}
              onCheckedChange={(checked) => setTelegramConfig((prev) => ({ ...prev, enabled: checked }))}
            />
            <Label>Activar notificaciones de Telegram</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>🤖 Bot Token</Label>
              <Input
                type="password"
                value={telegramConfig.botToken}
                onChange={(e) => setTelegramConfig((prev) => ({ ...prev, botToken: e.target.value }))}
                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Obtén tu token de @BotFather en Telegram</p>
            </div>
            <div>
              <Label>💬 Chat ID</Label>
              <Input
                value={telegramConfig.chatId}
                onChange={(e) => setTelegramConfig((prev) => ({ ...prev, chatId: e.target.value }))}
                placeholder="123456789"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Tu ID de chat personal</p>
            </div>
          </div>

          <Button onClick={testTelegram} className="flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Probar Telegram
          </Button>
        </CardContent>
      </Card>

      {/* Configuración de Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-500" />📧 Configuración de Email
          </CardTitle>
          <CardDescription>Recibe reportes detallados y alertas importantes por email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={emailConfig.enabled}
              onCheckedChange={(checked) => setEmailConfig((prev) => ({ ...prev, enabled: checked }))}
            />
            <Label>Activar notificaciones por email</Label>
          </div>

          <div>
            <Label>📧 Email de destino</Label>
            <Input
              type="email"
              value={emailConfig.email}
              onChange={(e) => setEmailConfig((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="tu-email@gmail.com"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Email donde recibirás las notificaciones</p>
          </div>

          <Button onClick={testEmail} className="flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Probar Email
          </Button>
        </CardContent>
      </Card>

      {/* Tipos de Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-500" />🔔 Tipos de Notificaciones
          </CardTitle>
          <CardDescription>Configura qué eventos quieres recibir</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>💰 Operaciones Ejecutadas</Label>
                <p className="text-xs text-gray-500">Notificación por cada trade exitoso</p>
              </div>
              <Switch
                checked={notificationTypes.trades}
                onCheckedChange={(checked) => setNotificationTypes((prev) => ({ ...prev, trades: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>❌ Errores del Bot</Label>
                <p className="text-xs text-gray-500">Alertas de errores críticos</p>
              </div>
              <Switch
                checked={notificationTypes.errors}
                onCheckedChange={(checked) => setNotificationTypes((prev) => ({ ...prev, errors: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>⚠️ Balance Bajo</Label>
                <p className="text-xs text-gray-500">Cuando USDT o BNB están bajos</p>
              </div>
              <Switch
                checked={notificationTypes.lowBalance}
                onCheckedChange={(checked) => setNotificationTypes((prev) => ({ ...prev, lowBalance: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>🤖 Estado del Bot</Label>
                <p className="text-xs text-gray-500">Inicio, parada y cambios de estado</p>
              </div>
              <Switch
                checked={notificationTypes.botStatus}
                onCheckedChange={(checked) => setNotificationTypes((prev) => ({ ...prev, botStatus: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>📊 Reporte Diario</Label>
                <p className="text-xs text-gray-500">Resumen diario de operaciones</p>
              </div>
              <Switch
                checked={notificationTypes.dailyReport}
                onCheckedChange={(checked) => setNotificationTypes((prev) => ({ ...prev, dailyReport: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultado de pruebas */}
      {testResult && (
        <Card className={testResult.includes("✅") ? "border-green-500" : "border-red-500"}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {testResult.includes("✅") ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Bell className="w-5 h-5 text-red-500" />
              )}
              <span>{testResult}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instrucciones */}
      <Card className="bg-blue-50 dark:bg-blue-900">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300">📋 Instrucciones de Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold">🤖 Para Telegram:</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
              <li>Busca @BotFather en Telegram</li>
              <li>Envía /newbot y sigue las instrucciones</li>
              <li>Copia el token que te proporciona</li>
              <li>Busca @userinfobot para obtener tu Chat ID</li>
              <li>Pega ambos valores arriba y prueba la conexión</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold">📧 Para Gmail:</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
              <li>Activa la verificación en 2 pasos en tu Gmail</li>
              <li>Genera una "Contraseña de aplicación"</li>
              <li>Configura las variables de entorno del servidor</li>
              <li>Prueba la conexión con el botón de arriba</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

#Propósito General
Este archivo define un componente de React llamado NotificationPanel que implementa un panel de configuración interactivo para las notificaciones del sistema del bot (por ejemplo, de trading automático). Permite a los usuarios configurar y probar notificaciones por Telegram y email, así como elegir qué tipos de eventos desean recibir, todo desde una interfaz gráfica amigable.

Detalles Funcionales
1. Configuración de Telegram
Permite al usuario:
Activar/desactivar notificaciones de Telegram mediante un switch.
Ingresar el Bot Token (secreto, tipo password) y el Chat ID personal.
Ofrece un botón para probar la configuración de Telegram, enviando un mensaje de prueba.
Muestra instrucciones para crear un bot y obtener el Chat ID en Telegram.
Si la prueba es exitosa/fallida, muestra un mensaje de estado visual.
2. Configuración de Email
Permite al usuario:
Activar/desactivar notificaciones por email mediante un switch.
Ingresar el email de destino.
Proporciona un botón para probar la configuración de email (envía un mensaje de prueba).
Ofrece instrucciones específicas para Gmail (autenticación en dos pasos y contraseñas de aplicación).
Muestra un mensaje de prueba exitosa/fallida.
3. Tipos de Notificaciones
Permite al usuario seleccionar (activar/desactivar) qué tipos de eventos recibir:

Operaciones Ejecutadas (trades exitosos)
Errores del Bot (alertas críticas)
Balance Bajo (alerta por saldo bajo en USDT/BNB)
Estado del Bot (inicio, parada y cambios)
Reporte Diario (resumen de operaciones cada día)
Cada opción incluye un pequeño texto descriptivo.

4. Resultado de Pruebas
Al probar Telegram o email, el resultado (éxito o error) se muestra en una tarjeta destacada con icono e indicación visual (verde para éxito, rojo para error).
5. Instrucciones
Presenta, en la parte inferior, instrucciones detalladas para configurar tanto Telegram como Gmail, usando listas numeradas para guiar paso a paso.
Detalles Técnicos
useState administra los estados de configuración y los switches de tipos de notificación.
useNotifications es un hook personalizado (no definido aquí, pero importado) que probablemente gestiona el envío real de notificaciones.
Se usan componentes visuales reutilizables como Card, Switch, Input, Button, e íconos de Lucide React.
El diseño es responsivo y utiliza utilidades de Tailwind CSS para la disposición y estilo.
Resumido en pasos:
Recolecta información de configuración de Telegram y email.
Permite probar que las notificaciones lleguen correctamente a ambos canales.
Deja elegir qué eventos generan notificación.
Muestra el resultado de las pruebas de configuración.
Guía al usuario para que configure correctamente sus servicios de notificación.
