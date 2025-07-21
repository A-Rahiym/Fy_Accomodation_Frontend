"use client"

import { PageLayout } from "../components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      id: "1",
      question: "How do I apply for accommodation?",
      answer:
        "To apply for accommodation, navigate to the 'Hostel Selection' page and choose your preferred hostels in order of preference. You can select up to 3 choices to increase your chances of allocation.",
    },
    {
      id: "2",
      question: "When is the accommodation application deadline?",
      answer:
        "The accommodation application deadline is typically 4 weeks before the start of each academic session. Check the announcements section for specific dates.",
    },
    {
      id: "3",
      question: "Can I change my hostel selection after submission?",
      answer:
        "No, hostel selections cannot be changed once submitted. Please review your choices carefully before confirming your submission.",
    },
    {
      id: "4",
      question: "How much does accommodation cost?",
      answer:
        "Accommodation fees vary by hostel type and room category. The standard fee is ₦45,000 per academic session, plus a ₦2,000 service fee.",
    },
    {
      id: "5",
      question: "What documents do I need for payment verification?",
      answer:
        "You need to upload a clear image or PDF of your payment receipt showing the transaction reference, amount paid, and payment date. Supported formats are JPG, PNG, and PDF (max 5MB).",
    },
    {
      id: "6",
      question: "How will I know if my application is successful?",
      answer:
        "You will receive an email notification and can check your dashboard for room allocation status. Successful applicants will see their assigned room details.",
    },
    {
      id: "7",
      question: "What if I have issues with my payment?",
      answer:
        "If you encounter payment issues, contact the accommodation office immediately. You can also submit evidence of payment through the 'Verify Payment' page.",
    },
    {
      id: "8",
      question: "Can I request a specific roommate?",
      answer:
        "Roommate requests can be made during the application process, but allocation is subject to availability and compatibility assessment.",
    },
  ]

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-2">Find answers to common questions about the accommodation portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Need More Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <p className="mb-4">If you can't find the answer to your question, please contact us:</p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> accommodation@abu.edu.ng
              </p>
              <p>
                <strong>Phone:</strong> +234 69 550 1234
              </p>
              <p>
                <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 4:00 PM
              </p>
              <p>
                <strong>Location:</strong> Student Affairs Division, ABU Main Campus
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
