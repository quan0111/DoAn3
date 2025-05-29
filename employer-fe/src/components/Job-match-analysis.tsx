"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface JobMatchAnalysisProps {
  jobId?: string
  jobTitle?: string
  jobDescription?: string
}

export function JobMatchAnalysis({ jobId, jobTitle, jobDescription }: JobMatchAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(!!jobId)
  const [description, setDescription] = useState(jobDescription || "")

  const handleAnalyze = () => {
    if (!description.trim()) return

    setIsAnalyzing(true)

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setIsAnalyzed(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {!isAnalyzed ? (
        <Card>
          <CardHeader>
            <CardTitle>So sánh CV với mô tả công việc</CardTitle>
            <CardDescription>
              Dán mô tả công việc để phân tích mức độ phù hợp của CV với vị trí ứng tuyển
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="job-description" className="text-sm font-medium">
                  Mô tả công việc
                </label>
                <Textarea
                  id="job-description"
                  placeholder="Dán mô tả công việc vào đây..."
                  className="min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1" disabled={isAnalyzing}>
                  <Upload className="h-4 w-4 mr-2" />
                  Tải lên file mô tả
                </Button>
                <Button variant="outline" className="flex-1" disabled={isAnalyzing}>
                  <FileText className="h-4 w-4 mr-2" />
                  Chọn từ việc làm đã lưu
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalyze} disabled={!description.trim() || isAnalyzing} className="w-full">
              {isAnalyzing ? "Đang phân tích..." : "Phân tích mức độ phù hợp"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Mức độ phù hợp tổng thể</span>
                <span className="text-green-600">75%</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Kỹ năng chuyên môn</span>
                  <span className="font-medium">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Kinh nghiệm làm việc</span>
                  <span className="font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Học vấn & Chứng chỉ</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Từ khóa quan trọng</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <Button variant="outline" className="w-full" onClick={() => setIsAnalyzed(false)}>
                Phân tích mô tả công việc khác
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Đề xuất cải thiện</CardTitle>
              <CardDescription>Những điểm cần bổ sung hoặc điều chỉnh để tăng khả năng phù hợp</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-medium">Kỹ năng còn thiếu</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Docker & Kubernetes</p>
                        <p className="text-muted-foreground">
                          Mô tả công việc yêu cầu kinh nghiệm với Docker và Kubernetes, nhưng CV của bạn chưa đề cập
                          đến.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">CI/CD Pipeline</p>
                        <p className="text-muted-foreground">
                          Kinh nghiệm với CI/CD là yêu cầu quan trọng cho vị trí này.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base font-medium">Từ khóa quan trọng cần bổ sung</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Microservices Architecture</p>
                        <p className="text-muted-foreground">
                          Đây là từ khóa xuất hiện nhiều lần trong mô tả công việc.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Agile & Scrum</p>
                        <p className="text-muted-foreground">
                          Công ty làm việc theo phương pháp Agile, hãy nhấn mạnh kinh nghiệm của bạn với quy trình này.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base font-medium">Điểm mạnh cần nhấn mạnh</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Kinh nghiệm với React</p>
                        <p className="text-muted-foreground">
                          CV của bạn đã đề cập đến React, đây là yêu cầu quan trọng. Hãy mở rộng thêm về các dự án cụ
                          thể.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Kinh nghiệm làm việc nhóm</p>
                        <p className="text-muted-foreground">
                          Đây là điểm mạnh trong CV của bạn và cũng là yêu cầu quan trọng của vị trí.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
