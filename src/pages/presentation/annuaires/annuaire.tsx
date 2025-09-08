import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

const annuaireData = [
  {
    id: 1,
    name: "Entreprise Alpha",
    description: "Agence digitale spécialisée en design et développement web.",
    email: "contact@alpha.com",
    phone: "+261 34 12 345 67",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 2,
    name: "Entreprise Beta",
    description: "Cabinet de conseil en stratégie et innovation.",
    email: "hello@beta.com",
    phone: "+261 34 98 765 43",
    image: "https://via.placeholder.com/300x200"
  }
]

export default function Annuaire() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Annuaire</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {annuaireData.map((item) => (
          <Card key={item.id} className="rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              <div className="mt-4 flex gap-3">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Mail size={18}/> Email
                </Button>
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                  <Phone size={18}/> Appeler
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
