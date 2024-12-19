import React from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "Paylinc has revolutionized how we handle international payments. The payment system gives us peace of mind in every transaction.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Chen",
    role: "Freelance Developer",
    content:
      "As a freelancer, getting paid can be stressful. Paylinc has made it seamless and secure. I couldn't be happier!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Rodriguez",
    role: "E-commerce Manager",
    content:
      "The integration was smooth, and our customers love the added security. Paylinc has significantly reduced our payment disputes.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Don't just take our word for it - hear from some of our satisfied
            customers
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Avatar>
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
