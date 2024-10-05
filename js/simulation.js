"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { InfoIcon, DownloadIcon } from 'lucide-react'

// Datos de ejemplo - en una aplicación real, estos vendrían de una API
const data = [
  { year: 2010, co2: 389.9, ch4: 1808, n2o: 323.1 },
  { year: 2011, co2: 391.6, ch4: 1813, n2o: 324.2 },
  { year: 2012, co2: 393.8, ch4: 1819, n2o: 325.1 },
  { year: 2013, co2: 396.5, ch4: 1824, n2o: 326.0 },
  { year: 2014, co2: 398.6, ch4: 1831, n2o: 327.1 },
  { year: 2015, co2: 400.8, ch4: 1838, n2o: 328.2 },
  { year: 2016, co2: 404.2, ch4: 1844, n2o: 329.3 },
  { year: 2017, co2: 406.5, ch4: 1850, n2o: 330.4 },
  { year: 2018, co2: 408.5, ch4: 1857, n2o: 331.3 },
  { year: 2019, co2: 411.4, ch4: 1866, n2o: 332.1 },
  { year: 2020, co2: 414.2, ch4: 1879, n2o: 333.0 },
]

export default function ClimateDashboard() {
  const [selectedGas, setSelectedGas] = useState('co2')

  const gasOptions = {
    co2: { name: 'Carbon Dioxide', unit: 'ppm', color: '#FF6B6B' },
    ch4: { name: 'Methane', unit: 'ppb', color: '#4ECDC4' },
    n2o: { name: 'Nitrous Oxide', unit: 'ppb', color: '#45B7D1' },
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Climate Change Storyteller</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Greenhouse Gas Concentrations</CardTitle>
            <CardDescription>Annual average atmospheric concentrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={selectedGas} 
                  stroke={gasOptions[selectedGas].color} 
                  name={gasOptions[selectedGas].name} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Controls</CardTitle>
            <CardDescription>Customize your view</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Greenhouse Gas
              </label>
              <Select onValueChange={setSelectedGas} defaultValue={selectedGas}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a gas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="co2">Carbon Dioxide (CO₂)</SelectItem>
                  <SelectItem value="ch4">Methane (CH₄)</SelectItem>
                  <SelectItem value="n2o">Nitrous Oxide (N₂O)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <DownloadIcon className="mr-2 h-4 w-4" /> Download Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Understanding the Data</CardTitle>
          <CardDescription>The impact of greenhouse gases on our climate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Greenhouse gases play a crucial role in regulating Earth's temperature. The data shown above represents the annual average atmospheric concentrations of three major greenhouse gases: Carbon Dioxide (CO₂), Methane (CH₄), and Nitrous Oxide (N₂O).
          </p>
          <p className="text-gray-700 mb-4">
            These gases trap heat in the atmosphere, leading to the greenhouse effect. As their concentrations increase due to human activities, more heat is trapped, resulting in global warming and climate change.
          </p>
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 flex items-start">
            <InfoIcon className="mr-2 h-5 w-5 mt-1 flex-shrink-0" />
            <p>
              The steady increase in greenhouse gas concentrations over the years is a clear indicator of human impact on the Earth's atmosphere. This trend is closely linked to global temperature rise and various climate change effects observed worldwide.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}