'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { createClient } from '@/lib/utils/supabase/client'
import { motion } from 'framer-motion'

interface Template {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
}

interface TemplatePickerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (slug: string) => void
}

export function TemplatePickerModal({ open, onOpenChange, onSelect }: TemplatePickerModalProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [stepCompleted, setStepCompleted] = useState({
    github: false,
    template: false,
    vercel: false
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    async function fetchTemplates() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.from('templates').select('*')
      if (error) {
        console.error('Error fetching templates:', error)
        setError('Could not load templates. Please try again later.')
      } else {
        setTemplates(data || [])
      }
      setLoading(false)
    }
    if (open) {
      fetchTemplates()
    }
  }, [open])

  const handleSelect = (template: Template) => {
    setSelectedTemplate(template)
    setStepCompleted(prev => ({ ...prev, template: true }))
    onSelect(template.slug || template.id)
  }

  if (!mounted) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-950 text-white border-slate-800 max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select an Astro Template</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-6 text-sm text-slate-400">Loading templates...</div>
        ) : error ? (
          <div className="text-center py-6 text-red-500">{error}</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-stretch">
          {templates.map((template, index) => (
            <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900 hover:border-slate-700 transition-colors relative"
          >
            <img
              src={template.image_url || "/templates/coming-soon-screenshot.png"}
              alt={template.name}
              className="w-full h-40 object-cover"
              onError={(e) => (e.currentTarget.src = "/templates/coming-soon-screenshot.png")}
            />
              <Badge className="absolute top-2 left-2 bg-indigo-600">AI-ready</Badge>
              <div className="p-4 flex flex-col h-full border border-slate-800 rounded-lg overflow-hidden bg-slate-900 hover:border-slate-700 transition-colors relative">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{template.description}</p>
                </div>
                <Button
                  onClick={() => onSelect(template.slug)}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  🚀 Use This Template
                </Button>
              </div>
            </motion.div>
            ))}
          </div>   
        )}
      </DialogContent>
    </Dialog>
  )
}
